// deps

    // natives
    const { EventEmitter } = require("node:events");
    const childProcess = require("node:child_process");
    const { mkdtemp, rm, writeFile } = require("node:fs/promises");
    const https = require("node:https");
    const os = require("node:os");
    const { join } = require("node:path");
    const { rejects, strictEqual } = require("node:assert");

    // internal
    const downloadPrivatePackageLastVersion = require(join(__dirname, "..", "lib", "src", "deps", "downloadpackage", "downloadPrivatePackageLastVersion.ts")).default;
    const downloadPublicPackageLastVersion = require(join(__dirname, "..", "lib", "src", "deps", "downloadpackage", "downloadPublicPackageLastVersion.ts")).default;

// private

    const _originalGet = https.get;
    const _originalExec = childProcess.exec;
    const _originalExecFile = childProcess.execFile;
    const _originalHomedir = os.homedir;
    const _originalSetTimeout = globalThis.setTimeout;

    let _fakeHome = "";

    function _mockRegistry (statusCode, body) {

        https.get = (url, callback) => {

            const req = new EventEmitter();
            const res = new EventEmitter();

            req.destroy = () => {
                // nothing to do here
            };
            res.statusCode = statusCode;
            res.resume = () => {
                // nothing to do here
            };
            res.setEncoding = () => {
                // nothing to do here
            };

            process.nextTick(() => {

                if (200 === statusCode) {

                    process.nextTick(() => {
                        res.emit("data", body);
                        res.emit("end");
                    });

                }

                return callback(res);

            });

            return req;

        };

    }

    function _hangingGet () {

        https.get = () => {

            const req = new EventEmitter();

            req.destroy = (err) => {
                req.emit("error", err);
            };

            return req;

        };

        globalThis.setTimeout = (fn) => {

            process.nextTick(fn);

            return 1;

        };

    }

    function _failingGet (err) {

        https.get = () => {

            const req = new EventEmitter();

            req.destroy = () => {
                // nothing to do here
            };

            process.nextTick(() => {
                req.emit("error", err);
            });

            return req;

        };

    }

    function _mockNpm (init, install) {

        childProcess.exec = (command, options, callback) => {
            return init(options, callback);
        };

        childProcess.execFile = (file, args, options, callback) => {
            return install(options, callback);
        };

    }

    function _writeInstalledPackage (options, content) {

        return writeFile(join(options.cwd, "package.json"), content, "utf8");

    }

// tests

describe("download edges", () => {

    beforeEach(() => {

        return mkdtemp(join(os.tmpdir(), "check-version-modules-edges-")).then((dir) => {

            _fakeHome = dir;
            os.homedir = () => {
                return _fakeHome;
            };

        });

    });

    afterEach(() => {

        https.get = _originalGet;
        childProcess.exec = _originalExec;
        childProcess.execFile = _originalExecFile;
        os.homedir = _originalHomedir;
        globalThis.setTimeout = _originalSetTimeout;

        return _fakeHome ? rm(_fakeHome, {
            "recursive": true,
            "force": true
        }) : Promise.resolve();

    });

    describe("public registry", () => {

        it("should reject a non-200 registry response", () => {

            _mockRegistry(503, "");

            return rejects(
                downloadPublicPackageLastVersion("missing-pkg"),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("Impossible to join");

                }
            );

        });

        it("should reject when the registry request fails", () => {

            const failure = new Error("socket closed");

            _failingGet(failure);

            return rejects(
                downloadPublicPackageLastVersion("missing-pkg"),
                failure
            );

        });

        it("should reject when the registry request times out", () => {

            _hangingGet();

            return rejects(
                downloadPublicPackageLastVersion("slow-pkg"),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("Registry request timeout");

                }
            );

        });

        it("should reject an empty registry body", () => {

            _mockRegistry(200, "   ");

            return rejects(
                downloadPublicPackageLastVersion("empty-pkg"),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("does not return data");

                }
            );

        });

        it("should reject a registry body without dist-tags", () => {

            _mockRegistry(200, "{}");

            return rejects(
                downloadPublicPackageLastVersion("plain-pkg"),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("does not get dist-tags");

                }
            );

        });

        it("should reject dist-tags without a latest version", () => {

            _mockRegistry(200, JSON.stringify({
                "dist-tags": {}
            }));

            return rejects(
                downloadPublicPackageLastVersion("untagged-pkg"),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("does not return latest version");

                }
            );

        });

    });

    describe("private registry", () => {

        it("should reject when npm init fails", () => {

            const failure = new Error("init failed");

            _mockNpm((options, callback) => {
                callback(failure);
            }, () => {
                // nothing to do here
            });

            return rejects(
                downloadPrivatePackageLastVersion("pkg", ""),
                failure
            );

        });

        it("should reject when npm init writes to stderr", () => {

            _mockNpm((options, callback) => {
                callback(null, "", "init stderr");
            }, () => {
                // nothing to do here
            });

            return rejects(
                downloadPrivatePackageLastVersion("pkg", ""),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("init stderr");

                }
            );

        });

        it("should reject when npm install fails", () => {

            const failure = new Error("install failed");

            _mockNpm((options, callback) => {
                callback(null, "", "");
            }, (options, callback) => {
                callback(failure);
            });

            return rejects(
                downloadPrivatePackageLastVersion("pkg", ""),
                failure
            );

        });

        it("should reject an empty installed package.json", () => {

            _mockNpm((options, callback) => {

                return _writeInstalledPackage(options, "   ").then(() => {
                    callback(null, "", "");
                });

            }, (options, callback) => {
                callback(null);
            });

            return rejects(
                downloadPrivatePackageLastVersion("pkg", ""),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("does not return data");

                }
            );

        });

        it("should reject an install without dependencies", () => {

            _mockNpm((options, callback) => {

                return _writeInstalledPackage(options, "{}\n").then(() => {
                    callback(null, "", "");
                });

            }, (options, callback) => {
                callback(null);
            });

            return rejects(
                downloadPrivatePackageLastVersion("pkg", ""),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("does not get dependencies");

                }
            );

        });

        it("should reject an install that omitted the package", () => {

            _mockNpm((options, callback) => {

                return _writeInstalledPackage(options, JSON.stringify({
                    "dependencies": {
                        "other": "1.0.0"
                    }
                })).then(() => {
                    callback(null, "", "");
                });

            }, (options, callback) => {
                callback(null);
            });

            return rejects(
                downloadPrivatePackageLastVersion("pkg", ""),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("does not get \"pkg\"");

                }
            );

        });

        it("should reject an install whose version cannot be parsed", () => {

            _mockNpm((options, callback) => {

                return _writeInstalledPackage(options, JSON.stringify({
                    "dependencies": {
                        "pkg": "not-a-version"
                    }
                })).then(() => {
                    callback(null, "", "");
                });

            }, (options, callback) => {
                callback(null);
            });

            return rejects(
                downloadPrivatePackageLastVersion("pkg", ""),
                (err) => {

                    return err instanceof Error
                        && err.message.includes("does not return a valid version");

                }
            );

        });

        it("should return the installed version and remove the temporary directory", () => {

            const npmrc = join(_fakeHome, ".npmrc");

            return writeFile(npmrc, "registry=https://example.com\n", "utf8").then(() => {

                _mockNpm((options, callback) => {

                    return _writeInstalledPackage(options, JSON.stringify({
                        "dependencies": {
                            "pkg": "1.2.3"
                        }
                    })).then(() => {
                        callback(null, "", "");
                    });

                }, (options, callback) => {
                    callback(null);
                });

                return downloadPrivatePackageLastVersion("pkg", npmrc);

            }).then((version) => {
                strictEqual(version, "1.2.3");
            });

        });

    });

});

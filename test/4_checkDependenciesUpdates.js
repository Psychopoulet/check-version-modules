// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const checkAndFormateOptions = require(join(__dirname, "..", "lib", "cjs", "utils", "checkAndFormateOptions.js")).default;
    const checkDependenciesUpdates = require(join(__dirname, "..", "lib", "cjs", "deps", "checkDependenciesUpdates.js")).default;

// consts

    const MAX_TIMEOUT = 10000;
    const CURRENT_PUBLISHED_VERSION = "2.2.1";

// private

    /**
    * Return formated modules
    * @returns {Array} : formated modules
    */
    function _getModules () {

        return [
            {
                "version": "",
                "name": "check-version-modules",
                "path": "check-version-modules"
            }
        ];

    }

// tests

describe("checkDependenciesUpdates", () => {

    let options = null;

    before(() => {

        return checkAndFormateOptions({}).then((opt) => {
            options = opt;
        });

    });

    it("should test \"x\" & \"*\" patterns", () => {

        return Promise.resolve().then(() => {

            const version = "x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "*";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        });

    }).timeout(MAX_TIMEOUT);

    it("should test \"x.n.n\" & \"x.x.n\" & \"x.x.x\" patterns", () => {

        return Promise.resolve().then(() => {

            const version = "x.1.1";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "x.x.1";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "x.x.x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        });

    });

    it("should test \"n\" & \"n.x\" & \"n.x.x\" patterns", () => {

        return Promise.resolve().then(() => {

            const version = "2";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "2.x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "2.x.x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        });

    });

    it("should test \"n.n\" & \"n.n.x\" patterns", () => {

        return Promise.resolve().then(() => {

            const version = "2.2";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "2.2.x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        });

    });

    it("should test \"n.n.n\" pattern", () => {

        const modules = _getModules();
            modules[0].version = CURRENT_PUBLISHED_VERSION;
        return checkDependenciesUpdates(modules, options).then((analyze) => {

            strictEqual(analyze.result, true);
            strictEqual(analyze.results instanceof Array, true);
            strictEqual(analyze.results.length, 1);

                strictEqual(analyze.results[0].result, "success");
                strictEqual(analyze.results[0].version, CURRENT_PUBLISHED_VERSION);

        });

    });

    it("should test \"^n.n.n\" & \"^n.n.x\" & \"^n.x.x\" patterns", () => {

        return Promise.resolve().then(() => {

            const version = "^2.1.0";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "^2.1.x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "^2.x.x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        });

    });

    it("should test \"~n.n.n\" & \"~n.n.x\" & \"~n.x.x\" patterns", () => {

        return Promise.resolve().then(() => {

            const version = "~2.2.0";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

            });

        }).then(() => {

            const version = "~2.2.x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

                return Promise.resolve();

            });

        }).then(() => {

            const version = "~2.x.x";

            const modules = _getModules();
                modules[0].version = version;
            return checkDependenciesUpdates(modules, options).then((analyze) => {

                strictEqual(analyze.result, true);
                strictEqual(analyze.results instanceof Array, true);
                strictEqual(analyze.results.length, 1);

                    strictEqual(analyze.results[0].result, "success");
                    strictEqual(analyze.results[0].version, version);

                return Promise.resolve();

            });

        });

    });

    it("should test wrong pattern \"n.n.n.n\" & \"^~n.n.n\"", () => {

        const version = "1.2.1.1";

        const modules = _getModules();
            modules[0].version = version;
        return checkDependenciesUpdates(modules, options).then((analyze) => {

            strictEqual(analyze.result, true);
            strictEqual(analyze.results instanceof Array, true);
            strictEqual(analyze.results.length, 1);

                strictEqual(analyze.results[0].result, "warning");
                strictEqual(analyze.results[0].version, version);

        });

    });

    it("should test wrong pattern \"^~n.n.n\"", () => {

        const version = "^~1.2.1.1";

        const modules = _getModules();
            modules[0].version = version;
        return checkDependenciesUpdates(modules, options).then((analyze) => {

            strictEqual(analyze.result, true);
            strictEqual(analyze.results instanceof Array, true);
            strictEqual(analyze.results.length, 1);

                strictEqual(analyze.results[0].result, "warning");
                strictEqual(analyze.results[0].version, version);

        });

    });

    it("should test wrong pattern string", () => {

        const version = "git+https://git@github.com/Psychopoulet/check-version-modules";

        const modules = _getModules();
            modules[0].version = version;
        return checkDependenciesUpdates(modules, {
            ...options
        }).then((analyze) => {

            strictEqual(analyze.result, true);
            strictEqual(analyze.results instanceof Array, true);
            strictEqual(analyze.results.length, 1);

                strictEqual(analyze.results[0].result, "warning");
                strictEqual(analyze.results[0].version, version);

        });

    });

    describe("checkDependenciesUpdates", () => {

        it("should test good version", () => {

            return checkAndFormateOptions({
                "failAtMajor": true,
                "failAtMinor": true,
                "failAtPatch": true
            }).then((opt) => {

                const modules = _getModules();
                    modules[0].version = CURRENT_PUBLISHED_VERSION;
                return checkDependenciesUpdates(modules, opt).then((analyze) => {

                    strictEqual(analyze.result, true);
                    strictEqual(analyze.results instanceof Array, true);
                    strictEqual(analyze.results.length, 1);

                        strictEqual(analyze.results[0].result, "success");
                        strictEqual(analyze.results[0].version, CURRENT_PUBLISHED_VERSION);

                });

            });

        });

        it("should test old major version", () => {

            return checkAndFormateOptions({
                "failAtMajor": true,
                "failAtMinor": true,
                "failAtPatch": true
            }).then((opt) => {

                const version = "1.5.0";

                const modules = _getModules();
                    modules[0].version = version;
                return checkDependenciesUpdates(modules, opt).then((analyze) => {

                    strictEqual(analyze.result, false);
                    strictEqual(analyze.results instanceof Array, true);
                    strictEqual(analyze.results.length, 1);

                        strictEqual(analyze.results[0].result, "fail_major");
                        strictEqual(analyze.results[0].version, version);

                });

            });

        });

        it("should test old minor version", () => {

            return checkAndFormateOptions({
                "failAtMajor": true,
                "failAtMinor": true,
                "failAtPatch": true
            }).then((opt) => {

                const version = "2.1.0";

                const modules = _getModules();
                    modules[0].version = version;
                return checkDependenciesUpdates(modules, opt).then((analyze) => {

                    strictEqual(analyze.result, false);
                    strictEqual(analyze.results instanceof Array, true);
                    strictEqual(analyze.results.length, 1);

                        strictEqual(analyze.results[0].result, "fail_minor");
                        strictEqual(analyze.results[0].version, version);

                });

            });

        });

        it("should test old patch version", () => {

            const versionSplitted = CURRENT_PUBLISHED_VERSION.split(".");

            if ("0" === versionSplitted[2]) {
                return Promise.resolve();
            }

            return checkAndFormateOptions({
                "failAtMajor": true,
                "failAtMinor": true,
                "failAtPatch": true
            }).then((opt) => {

                const version = "2.2.0";

                const modules = _getModules();
                    modules[0].version = version;
                return checkDependenciesUpdates(modules, opt).then((analyze) => {

                    strictEqual(analyze.result, false);
                    strictEqual(analyze.results instanceof Array, true);
                    strictEqual(analyze.results.length, 1);

                        strictEqual(analyze.results[0].result, "fail_patch");
                        strictEqual(analyze.results[0].version, version);

                });

            });

        });

    });

});

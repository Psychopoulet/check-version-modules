// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const checkVersionValidity = require(join(__dirname, "..", "lib", "cjs", "version", "checkVersionValidity.js")).default;

// tests

describe("checkVersionValidity", () => {

    describe("strict", () => {

        it("should test \"x\" & \"*\" patterns", () => {

            return checkVersionValidity("x").then(() => {
                return checkVersionValidity("*");
            });

        });

        it("should test \"x.n.n\" & \"x.x.n\" & \"x.x.x\" patterns", () => {

            return checkVersionValidity("x.1.1").then(() => {
                return checkVersionValidity("*.1.1");
            }).then(() => {
                return checkVersionValidity("x.x.1");
            }).then(() => {
                return checkVersionValidity("*.*.1");
            }).then(() => {
                return checkVersionValidity("x.x.x");
            }).then(() => {
                return checkVersionValidity("*.*.*");
            }).then(() => {
                return checkVersionValidity("x.*.x");
            });

        });

        it("should test \"n\" & \"n.x\" & \"n.x.x\" patterns", () => {

            return checkVersionValidity("1").then(() => {
                return checkVersionValidity("1.x");
            }).then(() => {
                return checkVersionValidity("1.x.x");
            });

        });

        it("should test \"n.n\" & \"n.n.x\" patterns", () => {

            return checkVersionValidity("1.1").then(() => {
                return checkVersionValidity("1.1.x");
            });

        });

        it("should test \"n.n.n\" pattern", () => {

            return checkVersionValidity("1.1.1");

        });

        it("should test \"^n.n.n\" & \"^n.n.x\" & \"^n.x.x\" patterns", () => {

            return checkVersionValidity("^1.1.1").then(() => {
                return checkVersionValidity("^1.1.x");
            }).then(() => {
                return checkVersionValidity("^1.x.x");
            });

        });

        it("should test \"~n.n.n\" & \"~n.n.x\" & \"~n.x.x\" patterns", () => {

            return checkVersionValidity("~1.1.1").then(() => {
                return checkVersionValidity("~1.1.x");
            }).then(() => {
                return checkVersionValidity("~1.x.x");
            });

        });

        it("should test wrong pattern \"n.n.n.n\"", (done) => {

            checkVersionValidity("1.1.1.1").then(() => {
                done(new Error("There is no generated Error"));
            }).catch((err) => {

                strictEqual(typeof err, "object");
                strictEqual(err instanceof Error, true);

                done();

            });

        });

        it("should test wrong pattern \"^~n.n.n\"", (done) => {

            checkVersionValidity("^~1.1.1").then(() => {
                done(new Error("There is no generated Error"));
            }).catch((err) => {

                strictEqual(typeof err, "object");
                strictEqual(err instanceof Error, true);

                done();

            });

        });

    });

    describe("non-strict", () => {

        it("should test \"x\" & \"*\" patterns", () => {

            return checkVersionValidity("x", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("*", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

            });

        });

        it("should test \"x.n.n\" & \"x.x.n\" & \"x.x.x\" patterns", () => {

            return checkVersionValidity("x.1.1", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("*.1.1", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("x.x.1", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("*.*.1", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("x.x.x", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("*.*.*", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("x.*.x", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

            });

        });

        it("should test \"n\" & \"n.x\" & \"n.x.x\" patterns", () => {

            return checkVersionValidity("1", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("1.x", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("1.x.x", false);

            });

        });

        it("should test \"n.n\" & \"n.n.x\" patterns", () => {

            return checkVersionValidity("1.1", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("1.1.x", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

            });

        });

        it("should test \"n.n.n\" pattern", () => {

            return checkVersionValidity("1.1.1", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

            });

        });

        it("should test \"^n.n.n\" & \"^n.n.x\" & \"^n.x.x\" patterns", () => {

            return checkVersionValidity("^1.1.1", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("^1.1.x", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("^1.x.x", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

            });

        });

        it("should test \"~n.n.n\" & \"~n.n.x\" & \"~n.x.x\" patterns", () => {

            return checkVersionValidity("~1.1.1", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("~1.1.x", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

                return checkVersionValidity("~1.x.x", false);

            }).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, true);

            });

        });

        it("should test wrong pattern \"n.n.n.n\"", () => {

            checkVersionValidity("1.1.1.1", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, false);

            });

        });

        it("should test wrong pattern \"^~n.n.n\"", () => {

            checkVersionValidity("^~1.1.1", false).then((valid) => {

                strictEqual(typeof valid, "boolean");
                strictEqual(valid, false);

            });

        });

    });

});

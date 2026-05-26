// deps

    // natives
    const { join } = require("node:path");
    const { readFile } = require("node:fs/promises");
    const { strictEqual } = require("node:assert");

    // internal
    const formateDeps = require(join(__dirname, "..", "lib", "cjs", "deps", "formateDeps.js")).default;

// tests

describe("formateDeps", () => {

    describe("with project package.json", () => {

        let data = null;

        before(() => {

            return readFile(join(__dirname, "..", "package.json"), "utf-8").then((content) => {
                return JSON.parse(content);
            }).then((packageData) => {
                data = packageData;
            });

        });

        it("should format dependencies only when dev and optional are disabled", () => {

            const formated = formateDeps(data, false, false);

            strictEqual(formated instanceof Array, true);
            strictEqual(formated.length, 1);

            strictEqual(formated[0].name, "semver");
            strictEqual(formated[0].version, data.dependencies.semver);
            strictEqual(formated[0].dev, false);
            strictEqual(formated[0].optional, false);
            strictEqual(formated[0].path, "semver");

        });

        it("should format dependencies and devDependencies when dev is enabled", () => {

            const formated = formateDeps(data, true, false);

            strictEqual(formated instanceof Array, true);
            strictEqual(formated.length, 11);

            const devDeps = formated.filter((dep) => {
                return dep.dev;
            });

            strictEqual(devDeps.length, 10);

            devDeps.forEach((dep) => {

                strictEqual(dep.optional, false);
                strictEqual(dep.path, "dev/" + dep.name);
                strictEqual(dep.version, data.devDependencies[dep.name]);

            });

        });

        it("should format dependencies and optionalDependencies when optional is enabled", () => {

            const formated = formateDeps(data, false, true);

            strictEqual(formated instanceof Array, true);
            strictEqual(formated.length, 2);

            const optionalDep = formated.find((dep) => {
                return dep.optional;
            });

            strictEqual(optionalDep.name, "colors");
            strictEqual(optionalDep.dev, false);
            strictEqual(optionalDep.optional, true);
            strictEqual(optionalDep.path, "optional/colors");
            strictEqual(optionalDep.version, data.optionalDependencies.colors);

        });

        it("should format all dependency kinds with default options (dev and optional enabled)", () => {

            const formated = formateDeps(data, true, true);

            strictEqual(formated instanceof Array, true);
            strictEqual(formated.length, 12);

            strictEqual(formated.filter((dep) => {
                return !dep.dev && !dep.optional;
            }).length, 1);

            strictEqual(formated.filter((dep) => {
                return dep.dev;
            }).length, 10);

            strictEqual(formated.filter((dep) => {
                return dep.optional;
            }).length, 1);

        });

    });

    describe("with synthetic package data", () => {

        it("should return an empty array for an empty package", () => {

            const formated = formateDeps({}, false, false);

            strictEqual(formated instanceof Array, true);
            strictEqual(formated.length, 0);

        });

        it("should ignore devDependencies when dev is disabled", () => {

            const packageData = {
                "devDependencies": {
                    "mocha": "11.7.6"
                }
            };

            const formated = formateDeps(packageData, false, false);

            strictEqual(formated.length, 0);

        });

        it("should ignore optionalDependencies when optional is disabled", () => {

            const packageData = {
                "optionalDependencies": {
                    "colors": "1.4.0"
                }
            };

            const formated = formateDeps(packageData, false, false);

            strictEqual(formated.length, 0);

        });

        it("should format only optionalDependencies when optional is enabled", () => {

            const packageData = {
                "optionalDependencies": {
                    "colors": "1.4.0"
                }
            };

            const formated = formateDeps(packageData, false, true);

            strictEqual(formated.length, 1);
            strictEqual(formated[0].name, "colors");
            strictEqual(formated[0].optional, true);
            strictEqual(formated[0].path, "optional/colors");

        });

        it("should format only devDependencies when dev is enabled", () => {

            const packageData = {
                "devDependencies": {
                    "mocha": "11.7.6"
                }
            };

            const formated = formateDeps(packageData, true, false);

            strictEqual(formated.length, 1);
            strictEqual(formated[0].name, "mocha");
            strictEqual(formated[0].dev, true);
            strictEqual(formated[0].path, "dev/mocha");

        });

        it("should concatenate dependencies, devDependencies and optionalDependencies", () => {

            const packageData = {
                "dependencies": {
                    "semver": "7.8.1"
                },
                "devDependencies": {
                    "mocha": "11.7.6"
                },
                "optionalDependencies": {
                    "colors": "1.4.0"
                }
            };

            const formated = formateDeps(packageData, true, true);

            strictEqual(formated.length, 3);
            strictEqual(formated[0].name, "semver");
            strictEqual(formated[1].name, "mocha");
            strictEqual(formated[2].name, "colors");

        });

    });

});

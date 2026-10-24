// deps

    // natives
    const { join } = require("node:path");
    const { tmpdir } = require("node:os");
    const { writeFile, rm } = require("node:fs/promises");
    const { strictEqual } = require("node:assert");

    // internal
    const checkVersionModule = require(join(__dirname, "..", "lib", "src", "main.cts"));

// tests

describe("checkVersionModule", () => {

    it("should analyze a package object", () => {

        return checkVersionModule({}).then((analyze) => {

            strictEqual(analyze.result, true);
            strictEqual(Array.isArray(analyze.results), true);
            strictEqual(analyze.results.length, 0);

        });

    });

    it("should analyze a package.json file", () => {

        const file = join(tmpdir(), "check-version-modules-empty-package.json");

        return writeFile(file, "{}\n", "utf8").then(() => {
            return checkVersionModule(file);
        }).then((analyze) => {

            strictEqual(analyze.result, true);
            strictEqual(analyze.results.length, 0);

            return rm(file);

        });

    });

    it("should reject a source that is not a package", () => {

        return checkVersionModule(1).then(() => {
            return Promise.reject(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(err instanceof TypeError, true);
            strictEqual(err.message, "\"source\" parameter is not a string or a package type");

        });

    });

});

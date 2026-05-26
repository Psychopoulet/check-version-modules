// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const checkNpmrcFile = require(join(__dirname, "..", "lib", "cjs", "utils", "checkNpmrcFile.js")).default;

// tests

describe("checkNpmrcFile", () => {

    it("should accept an empty npmrcFile", () => {
        return checkNpmrcFile("");
    });

    it("should reject a non-string npmrcFile", (done) => {

        checkNpmrcFile(false).then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof TypeError, true);
            strictEqual(err.message, "\"npmrcFile\" parameter is not a string");

            done();

        });

    });

    it("should reject a whitespace-only npmrcFile", (done) => {

        checkNpmrcFile("   ").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof RangeError, true);

            done();

        });

    });

    it("should reject a non-existent file", (done) => {

        checkNpmrcFile("not-a-valid-npmrc-file").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

    it("should accept a valid file", () => {
        return checkNpmrcFile(__filename);
    });

});

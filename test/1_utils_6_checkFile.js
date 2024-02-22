// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const checkFile = require(join(__dirname, "..", "lib", "cjs", "utils", "checkFile.js")).default;

// tests

describe("checkFile", () => {

    it("should test not a file", (done) => {

        checkFile("test").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

    it("should test valid file", () => {
        return checkFile(__filename);
    });

});

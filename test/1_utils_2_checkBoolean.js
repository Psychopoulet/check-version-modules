// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const checkBoolean = require(join(__dirname, "..", "lib", "cjs", "utils", "checkBoolean.js")).default;

// tests

describe("checkBoolean", () => {

    it("should test nothing", (done) => {

        checkBoolean().then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof ReferenceError, true);

            done();

        });

    });

    it("should test not a string", (done) => {

        checkBoolean("test").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof TypeError, true);

            done();

        });

    });

    it("should test non empty string", () => {
        return checkBoolean(true);
    });

});

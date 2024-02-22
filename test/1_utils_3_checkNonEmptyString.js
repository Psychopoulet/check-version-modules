// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const checkNonEmptyString = require(join(__dirname, "..", "lib", "cjs", "utils", "checkNonEmptyString.js")).default;

// tests

describe("checkNonEmptyString", () => {

    it("should test nothing", (done) => {

        checkNonEmptyString().then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof ReferenceError, true);

            done();

        });

    });

    it("should test not a string", (done) => {

        checkNonEmptyString(false).then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof TypeError, true);

            done();

        });

    });

    it("should test empty string", (done) => {

        checkNonEmptyString("").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof RangeError, true);

            done();

        });

    });

    it("should test non empty string", () => {
        return checkNonEmptyString("1.1.1");
    });

});

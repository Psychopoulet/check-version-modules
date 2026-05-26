// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const getUpdateFailureLevel = require(join(__dirname, "..", "lib", "cjs", "version", "getUpdateFailureLevel.js")).default;

// tests

describe("getUpdateFailureLevel", () => {

    it("should return fail_major when latest is a major bump from the range floor", () => {

        strictEqual(getUpdateFailureLevel("1.5.0", "2.4.0"), "fail_major");
        strictEqual(getUpdateFailureLevel("^2.1.0", "3.0.0"), "fail_major");

    });

    it("should return fail_minor when latest is a minor bump from the range floor", () => {

        strictEqual(getUpdateFailureLevel("2.1.0", "2.4.0"), "fail_minor");
        strictEqual(getUpdateFailureLevel("2.2.0", "2.4.0"), "fail_minor");

    });

    it("should return fail_patch when latest is a patch bump from the range floor", () => {

        strictEqual(getUpdateFailureLevel("2.4.0", "2.4.1"), "fail_patch");
        strictEqual(getUpdateFailureLevel("~2.4.0", "2.4.2"), "fail_patch");

    });

    it("should return fail_patch when latest cannot be parsed", () => {

        strictEqual(getUpdateFailureLevel("2.1.0", "not-a-version"), "fail_patch");

    });

});

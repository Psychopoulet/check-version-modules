// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const checkAndFormateOptions = require(join(__dirname, "..", "lib", "cjs", "utils", "checkAndFormateOptions.js")).default;

// tests

describe("checkAndFormateOptions", () => {

    it("should test with no options", () => {

        return checkAndFormateOptions().then((options) => {

            strictEqual(typeof options, "object");
            strictEqual(options.failAtMajor, true);
            strictEqual(options.failAtMinor, true);
            strictEqual(options.failAtPatch, false);
            strictEqual(options.dev, true);
            strictEqual(options.optional, true);
            strictEqual(options.npmrcFile, "");

        });

    });

    it("should test with wrong failAtMajor", (done) => {

        checkAndFormateOptions({
            "failAtMajor": "test"
        }).then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

    it("should test with wrong failAtMinor", (done) => {

        checkAndFormateOptions({
            "failAtMinor": "test"
        }).then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

    it("should test with wrong failAtPatch", (done) => {

        checkAndFormateOptions({
            "failAtPatch": "test"
        }).then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

    it("should test with wrong dev", (done) => {

        checkAndFormateOptions({
            "dev": "test"
        }).then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

    it("should test valid options", () => {

        return checkAndFormateOptions({
            "failAtMajor": false,
            "failAtMinor": false,
            "failAtPatch": true,
            "dev": false
        }).then((options) => {

            strictEqual(typeof options, "object");
            strictEqual(options.failAtMajor, false);
            strictEqual(options.failAtMinor, false);
            strictEqual(options.failAtPatch, true);
            strictEqual(options.dev, false);

        });

    });

    it("should test with wrong npmrcFile type", (done) => {

        checkAndFormateOptions({
            "npmrcFile": false
        }).then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof TypeError, true);
            strictEqual(err.message, "\"npmrcFile\" parameter is not a string");

            done();

        });

    });

    it("should test with invalid npmrcFile path", (done) => {

        checkAndFormateOptions({
            "npmrcFile": "not-a-valid-npmrc-file"
        }).then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            strictEqual(err instanceof Error, true);

            done();

        });

    });

    it("should test with valid npmrcFile", () => {

        return checkAndFormateOptions({
            "npmrcFile": __filename
        }).then((options) => {

            strictEqual(options.npmrcFile, __filename);

        });

    });

});

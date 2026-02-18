// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual, ok } = require("node:assert");

    // internal
    const downloadPublicPackageLastVersion = require(join(__dirname, "..", "lib", "cjs", "deps", "downloadpackage", "downloadPublicPackageLastVersion.js")).default;

// consts

    const MAX_TIMEOUT = 10000;

// tests

describe("downloadPublicPackageLastVersion", () => {

    it("should reject invalid package name type", (done) => {

        downloadPublicPackageLastVersion(false).then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            strictEqual(err.message, "Package name is not a string");

            done();

        });

    });

    it("should reject empty package name", (done) => {

        downloadPublicPackageLastVersion("").then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            strictEqual(err.message, "Package name is empty");

            done();

        });

    });

    it("should reject invalid package name with \"..\"", (done) => {

        downloadPublicPackageLastVersion("some..pkg").then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            ok(err.message.startsWith("Invalid package name"));

            done();

        });

    });

    it("should reject invalid package name with backslash", (done) => {

        downloadPublicPackageLastVersion("pkg\\name").then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            ok(err.message.startsWith("Invalid package name"));

            done();

        });

    });

    it("should reject invalid package name with newline", (done) => {

        downloadPublicPackageLastVersion("pkg\nname").then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            ok(err.message.startsWith("Invalid package name"));

            done();

        });

    });

    it("should test inexistant module", (done) => {

        downloadPublicPackageLastVersion("zdc1az6d1a6qz15d6azd156qzd1a3zd1a33zae5cz3dfb21rfthrf3j1t3t3j13gty").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);

            done();

        });

    }).timeout(MAX_TIMEOUT);

});

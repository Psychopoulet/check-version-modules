// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual, ok } = require("node:assert");

    // internal
    const downloadPackageData = require(join(__dirname, "..", "lib", "cjs", "deps", "downloadPackageData.js")).default;

// consts

    const MAX_TIMEOUT = 10000;

// tests

describe("downloadPackageData", () => {

    it("should reject invalid package name type", (done) => {

        downloadPackageData(false).then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            strictEqual(err.message, "Package name is not a string");

            done();

        });

    });

    it("should reject empty package name", (done) => {

        downloadPackageData("").then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            strictEqual(err.message, "Package name is empty");

            done();

        });

    });

    it("should reject invalid package name with \"..\"", (done) => {

        downloadPackageData("some..pkg").then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            ok(err.message.startsWith("Invalid package name"));

            done();

        });

    });

    it("should reject invalid package name with backslash", (done) => {

        downloadPackageData("pkg\\name").then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            ok(err.message.startsWith("Invalid package name"));

            done();

        });

    });

    it("should reject invalid package name with newline", (done) => {

        downloadPackageData("pkg\nname").then(() => {
            done(new Error("There is no generated Error"));
        }, (err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);
            ok(err.message.startsWith("Invalid package name"));

            done();

        });

    });

    it("should test inexistant module", (done) => {

        downloadPackageData("zdc1az6d1a6qz15d6azd156qzd1a3zd1a33zae5cz3dfb21rfthrf3j1t3t3j13gty", "").then(() => {
            done(new Error("There is no generated Error"));
        }).catch((err) => {

            strictEqual(typeof err, "object");
            ok(err instanceof Error);

            done();

        });

    }).timeout(MAX_TIMEOUT);

    it("should test current module", () => {

        return downloadPackageData("check-version-modules", "");

    }).timeout(MAX_TIMEOUT);

    it("should test private module", () => {

        return downloadPackageData("check-version-modules", ".npmrc").then(() => {
            return downloadPackageData("check-version-modules", ".npmrc");
        });

    }).timeout(MAX_TIMEOUT);

    it("should test mutliple module", () => {

        return downloadPackageData("check-version-modules", "").then(() => {
            return downloadPackageData("check-version-modules", "");
        });

    }).timeout(MAX_TIMEOUT);

});

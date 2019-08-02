"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const downloadPackageData = require(join(__dirname, "..", "lib", "deps", "downloadPackageData.js"));

// tests

describe("downloadPackageData", () => {

	it("should test inexistant module", (done) => {

		downloadPackageData("zdc1az6d1a6qz15d6azd156qzd1a3zd1a33zae5cz3dfb21rfthrf3j1t3t3j13gty").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test current module", () => {

		return downloadPackageData("check-version-modules");

	});

	it("should test mutliple module", () => {

		return downloadPackageData("check-version-modules").then(() => {
			return downloadPackageData("check-version-modules");
		});

	});

});

// deps

    // natives
    const { join } = require("node:path");
    const { readFile } = require("node:fs/promises");
    const { strictEqual } = require("node:assert");

    // internal
    const formateDeps = require(join(__dirname, "..", "lib", "cjs", "deps", "formateDeps.js")).default;

// tests

describe("formateDeps", () => {

    let data = null;

    before(() => {

        return readFile(join(__dirname, "..", "package.json"), "utf-8").then((content) => {
            return JSON.parse(content);
        }).then(({ dependencies, devDependencies }) => {

            data = {
                dependencies,
                devDependencies
            };

        });

    });

    it("should test formate valid package without dev", () => {

        const formated = formateDeps(data);

        strictEqual(typeof formated, "object");
        strictEqual(formated instanceof Array, true);
        strictEqual(formated.length, 0);

    });

    it("should test formate valid package with dev", () => {

        const formated = formateDeps(data, true);

        strictEqual(typeof formated, "object");
        strictEqual(formated instanceof Array, true);
        strictEqual(formated.length, 8);

    });

});

// deps

    // natives
    const { join } = require("node:path");
    const { strictEqual } = require("node:assert");

    // internal
    const isPlainObject = require(join(__dirname, "..", "lib", "cjs", "utils", "isPlainObject.js")).default;

// tests

describe("isPlainObject", () => {

    describe("primitives and non-objects", () => {

        it("should return false when the argument is omitted", () => {
            strictEqual(isPlainObject(), false);
        });

        it("should return false for null", () => {
            strictEqual(isPlainObject(null), false);
        });

        it("should return false for a number", () => {
            strictEqual(isPlainObject(0), false);
            strictEqual(isPlainObject(NaN), false);
        });

        it("should return false for a string", () => {
            strictEqual(isPlainObject(""), false);
            strictEqual(isPlainObject("obj"), false);
        });

        it("should return false for a boolean", () => {
            strictEqual(isPlainObject(true), false);
            strictEqual(isPlainObject(false), false);
        });

        it("should return false for a bigint", () => {
            strictEqual(isPlainObject(1n), false);
        });

        it("should return false for a symbol", () => {
            strictEqual(isPlainObject(Symbol("x")), false);
        });

        it("should return false for a function", () => {
            strictEqual(isPlainObject(parseInt), false);
            strictEqual(isPlainObject(() => {
                return 1;
            }), false);
        });

    });

    describe("plain objects", () => {

        it("should return true for an object literal", () => {
            strictEqual(isPlainObject({}), true);
            strictEqual(isPlainObject({ "a": 1 }), true);
        });

        it("should return true for new Object()", () => {

            // eslint-disable-next-line no-object-constructor -- explicit coverage of Object() wrapper objects
            strictEqual(isPlainObject(new Object()), true);

        });

    });

    describe("non-plain objects", () => {

        it("should return false for an array", () => {
            strictEqual(isPlainObject([]), false);
            strictEqual(isPlainObject([ 1, 2 ]), false);
        });

        it("should return false for built-in object types", () => {
            strictEqual(isPlainObject(new Date()), false);
            strictEqual(isPlainObject(/./), false);
            strictEqual(isPlainObject(new Map()), false);
            strictEqual(isPlainObject(new Set()), false);
        });

        it("should return false for Object.create(null)", () => {
            strictEqual(isPlainObject(Object.create(null)), false);
        });

    });

});

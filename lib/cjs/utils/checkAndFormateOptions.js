"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const checkBoolean_1 = __importDefault(require("./checkBoolean"));
const checkNonNullPureObject_1 = __importDefault(require("./checkNonNullPureObject"));
// consts
const DEFAULT_OPTIONS = {
    "failAtMajor": true,
    "failAtMinor": true,
    "failAtPatch": false,
    "dev": true
};
// module
function checkAndFormateOptions(options = DEFAULT_OPTIONS) {
    return (0, checkNonNullPureObject_1.default)(options).then(() => {
        options.failAtMajor = "undefined" === typeof options.failAtMajor ? DEFAULT_OPTIONS.failAtMajor : options.failAtMajor;
        options.failAtMinor = "undefined" === typeof options.failAtMinor ? DEFAULT_OPTIONS.failAtMinor : options.failAtMinor;
        options.failAtPatch = "undefined" === typeof options.failAtPatch ? DEFAULT_OPTIONS.failAtPatch : options.failAtPatch;
        options.dev = "undefined" === typeof options.dev ? DEFAULT_OPTIONS.dev : options.dev;
        return (0, checkBoolean_1.default)(options.failAtMajor);
    }).then(() => {
        return (0, checkBoolean_1.default)(options.failAtMinor);
    }).then(() => {
        return (0, checkBoolean_1.default)(options.failAtPatch);
    }).then(() => {
        return (0, checkBoolean_1.default)(options.dev);
    }).then(() => {
        return Promise.resolve(options);
    });
}
exports.default = checkAndFormateOptions;

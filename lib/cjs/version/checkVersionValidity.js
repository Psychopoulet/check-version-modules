"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkVersionValidity;
// externals
const checkNonEmptyString_1 = __importDefault(require("../utils/checkNonEmptyString"));
// consts
const REGEX_LITERAL = "^[~^]{0,1}([*x0-9]+){1}(.[*x0-9]+){0,1}(.[*x0-9]+){0,1}$";
const REGEX = RegExp(REGEX_LITERAL);
// module
function checkVersionValidity(version, strict = true) {
    return (0, checkNonEmptyString_1.default)(version).then(() => {
        if (strict) {
            return REGEX.test(version) ? Promise.resolve("RUNNABLE") : Promise.reject(new Error("\"version\" parameter (\"" + version + "\") does not follow the allowed patterns (\"" + REGEX_LITERAL + "\")"));
        }
        else if (version.includes("git")) {
            return Promise.resolve("ALWAYS_UP_TO_UPDATE");
        }
        else {
            return REGEX.test(version) ? Promise.resolve("RUNNABLE") : Promise.resolve("NOT_RUNNABLE");
        }
    });
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const promises_1 = require("node:fs/promises");
// locals
const formateDeps_1 = __importDefault(require("./formateDeps"));
const sortDeps_1 = __importDefault(require("./sortDeps"));
// module
function extractAndFormateDeps(file, dev) {
    return (0, promises_1.readFile)(file, "utf-8").then((content) => {
        return JSON.parse(content);
    }).then((packageData) => {
        return (0, formateDeps_1.default)(packageData, dev);
    }).then((dependencies) => {
        return (0, sortDeps_1.default)(dependencies);
    });
}
exports.default = extractAndFormateDeps;
;

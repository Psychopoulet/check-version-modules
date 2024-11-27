"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkFile;
// natives
const node_fs_1 = require("node:fs");
// locals
const checkNonEmptyString_1 = __importDefault(require("./checkNonEmptyString"));
// module
function checkFile(file) {
    return (0, checkNonEmptyString_1.default)(file).then(() => {
        return new Promise((resolve, reject) => {
            (0, node_fs_1.lstat)(file, (err, stats) => {
                return !err && stats.isFile() ? resolve() : reject(new Error("\"file\" parameter (" + file + ") is not a valid file"));
            });
        });
    });
}

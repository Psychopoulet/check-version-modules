"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const checkVersionValidity_1 = __importDefault(require("./checkVersionValidity"));
const formateVersion_1 = __importDefault(require("./formateVersion"));
// module
function checkAndFormateVersion(version) {
    return (0, checkVersionValidity_1.default)(version).then(() => {
        return (0, formateVersion_1.default)(version);
    });
}
exports.default = checkAndFormateVersion;

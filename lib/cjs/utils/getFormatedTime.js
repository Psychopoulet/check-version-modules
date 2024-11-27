"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFormatedTime;
// locals
const padleft_1 = __importDefault(require("./padleft"));
// module
function getFormatedTime() {
    const date = new Date();
    return (0, padleft_1.default)(date.getHours()) + ":"
        + (0, padleft_1.default)(date.getMinutes()) + ":"
        + (0, padleft_1.default)(date.getSeconds());
}

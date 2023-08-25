"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// externals
let colors = null;
try { // test require optional deps
    colors = require("colors/safe");
}
catch (e) {
    // nothing to do here
}
// locals
const padleft_1 = __importDefault(require("./padleft"));
// module
function getFormatedTime() {
    const date = new Date();
    const content = (0, padleft_1.default)(date.getHours()) + ":" +
        (0, padleft_1.default)(date.getMinutes()) + ":" +
        (0, padleft_1.default)(date.getSeconds());
    return (colors && colors.white ? colors.white("[") : "[") +
        (colors && colors.grey ? colors.grey(content) : content) +
        (colors && colors.white ? colors.white("]") : "]");
}
exports.default = getFormatedTime;
;

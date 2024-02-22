"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function padleft(msg) {
    if ("string" === typeof msg) {
        return 2 > msg.length ? "0" + msg : msg;
    }
    else {
        return padleft(String(msg));
    }
}
exports.default = padleft;

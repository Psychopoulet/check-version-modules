"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkBoolean;
function checkBoolean(data) {
    if ("undefined" === typeof data) {
        return Promise.reject(new ReferenceError("Missing \"data\" parameter"));
    }
    else if ("boolean" !== typeof data) {
        return Promise.reject(new TypeError("\"data\" parameter is not a boolean"));
    }
    else {
        return Promise.resolve();
    }
}

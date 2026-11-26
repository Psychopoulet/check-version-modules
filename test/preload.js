// deps

    // natives
    const childProcess = require("node:child_process");
    const https = require("node:https");
    const os = require("node:os");

    // externals
    const { afterAll, beforeAll } = require("bun:test");

// private

    function _delegate (namespace, name) {

        const original = namespace[name];
        let current = original;

        function wrapped (...args) {

            return current(...args);

        }

        Object.defineProperty(namespace, name, {
            "configurable": true,
            "enumerable": true,
            "get": () => {

                return wrapped;

            },
            "set": (value) => {

                current = value === wrapped ? original : value;

            }
        });

    }

// module

if ("undefined" === typeof globalThis.before) {

    globalThis.before = beforeAll;

}

if ("undefined" === typeof globalThis.after) {

    globalThis.after = afterAll;

}

// Named imports in lib/src keep the function they linked. Assignment in a test must update that function.
_delegate(https, "get");
_delegate(os, "homedir");
_delegate(childProcess, "exec");
_delegate(childProcess, "execFile");

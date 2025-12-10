"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sortDeps;
// module
function sortDeps(dependencies) {
    return dependencies.sort((compared, compareTo) => {
        // by dev
        if (compared.dev && !compareTo.dev) {
            return 1;
        }
        else if (!compared.dev && compareTo.dev) {
            return -1;
        }
        // by optional
        else if (compared.optional && !compareTo.optional) {
            return 1;
        }
        else if (!compared.optional && compareTo.optional) {
            return -1;
        }
        // by name
        else if (compared.name > compareTo.name) {
            return 1;
        }
        else if (compared.name < compareTo.name) {
            return -1;
        }
        // otherwise
        else {
            return 0;
        }
    });
}

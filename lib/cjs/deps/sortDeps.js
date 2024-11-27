"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sortDeps;
// module
function sortDeps(dependencies) {
    return dependencies.sort((compared, compareTo) => {
        if (compared.dev && !compareTo.dev) {
            return 1;
        }
        else if (!compared.dev && compareTo.dev) {
            return -1;
        }
        else if (compared.name > compareTo.name) {
            return 1;
        }
        else if (compared.name < compareTo.name) {
            return -1;
        }
        else {
            return 0;
        }
    });
}

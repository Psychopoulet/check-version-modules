"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formateDeps;
// module
function formateDeps(packageData, dev, optional) {
    let result = [];
    const { dependencies, devDependencies, optionalDependencies } = packageData;
    if ("object" === typeof dependencies) {
        result = Object.keys(dependencies).map((dependency) => {
            return {
                "dev": false,
                "optional": false,
                "name": dependency,
                "version": dependencies[dependency],
                "path": dependency
            };
        });
    }
    if (dev && "object" === typeof devDependencies) {
        result = result.concat(Object.keys(devDependencies).map((dependency) => {
            return {
                "dev": true,
                "optional": false,
                "name": dependency,
                "version": devDependencies[dependency],
                "path": "dev/" + dependency
            };
        }));
    }
    if (optional && "object" === typeof optionalDependencies) {
        result = result.concat(Object.keys(optionalDependencies).map((dependency) => {
            return {
                "dev": false,
                "optional": true,
                "name": dependency,
                "version": optionalDependencies[dependency],
                "path": "optional/" + dependency
            };
        }));
    }
    return result;
}

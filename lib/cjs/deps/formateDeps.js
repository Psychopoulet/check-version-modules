"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formateDeps;
// module
function formateDeps(packageData, dev, optional) {
    const packageDependencies = packageData.dependencies;
    let result = Object.keys(packageDependencies).map((dependency) => {
        return {
            "dev": false,
            "optional": false,
            "name": dependency,
            "version": packageDependencies[dependency],
            "path": dependency
        };
    });
    if (dev && "object" === typeof packageData.devDependencies) {
        const packageDevDependencies = packageData.devDependencies;
        result = result.concat(Object.keys(packageDevDependencies).map((dependency) => {
            return {
                "dev": true,
                "optional": false,
                "name": dependency,
                "version": packageDevDependencies[dependency],
                "path": "dev/" + dependency
            };
        }));
    }
    if (optional && "object" === typeof packageData.optionalDependencies) {
        const packageOptionalDependencies = packageData.optionalDependencies;
        result = result.concat(Object.keys(packageOptionalDependencies).map((dependency) => {
            return {
                "dev": false,
                "optional": true,
                "name": dependency,
                "version": packageOptionalDependencies[dependency],
                "path": "optional/" + dependency
            };
        }));
    }
    return result;
}

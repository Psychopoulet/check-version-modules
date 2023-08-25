"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
// module
function formateDeps(packageData, dev) {
    const packageDependencies = packageData.dependencies;
    let result = Object.keys(packageDependencies).map((dependency) => {
        return {
            "dev": false,
            "name": dependency,
            "version": packageDependencies[dependency],
            "path": dependency
        };
    });
    if (dev && packageData.devDependencies) {
        const packageDevDependencies = packageData.devDependencies;
        result = result.concat(Object.keys(packageDevDependencies).map((dependency) => {
            return {
                "dev": true,
                "name": dependency,
                "version": packageDevDependencies[dependency],
                "path": "dev/" + dependency
            };
        }));
    }
    return result;
}
exports.default = formateDeps;
;

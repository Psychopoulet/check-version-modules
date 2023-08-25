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
const sortDeps_1 = __importDefault(require("./sortDeps"));
const downloadPackageData_1 = __importDefault(require("./downloadPackageData"));
const getFormatedTime_1 = __importDefault(require("../utils/getFormatedTime"));
const checkVersionValidity_1 = __importDefault(require("../version/checkVersionValidity"));
const checkAndFormateVersion_1 = __importDefault(require("../version/checkAndFormateVersion"));
// module
function checkDependenciesUpdates(dependencies, options) {
    let valid = true;
    const results = [];
    function _execute(deps) {
        if (!deps.length) {
            return Promise.resolve();
        }
        const dependency = deps.shift();
        return (0, checkVersionValidity_1.default)(dependency.version, false).then((runnable) => {
            if (!runnable && options.console) {
                results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": "not managed " + (colors && colors.yellow ? colors.yellow(dependency.version) : dependency.version) }));
            }
            return runnable;
        }).then((runCheck) => {
            return !runCheck ? Promise.resolve() : (0, checkAndFormateVersion_1.default)(dependency.version).then((formatedVersion) => {
                return (0, downloadPackageData_1.default)(dependency.name).then((latest) => {
                    const latestVersions = latest.split(".").map((v) => {
                        return parseInt(v, 10);
                    });
                    const currentVersions = formatedVersion.split(".").map((v) => {
                        return "x" === v ? v : parseInt(v, 10);
                    });
                    let failed = false;
                    return Promise.resolve().then(() => {
                        if (!failed && "x" !== currentVersions[0] && latestVersions[0] > currentVersions[0]) {
                            failed = true;
                            if (options.failAtMajor) {
                                valid = false;
                            }
                            if (options.console) {
                                results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": colors && colors.bgRed ? colors.bgRed(dependency.version + " < " + latest) : dependency.version + " < " + latest }));
                            }
                        }
                    }).then(() => {
                        if (!failed && "x" !== currentVersions[1] && latestVersions[1] > currentVersions[1]) {
                            failed = true;
                            if (options.failAtMinor) {
                                valid = false;
                            }
                            if (options.console) {
                                results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": colors && colors.red ? colors.red(dependency.version + " < " + latest) : dependency.version + " < " + latest }));
                            }
                        }
                    }).then(() => {
                        if (!failed && "x" !== currentVersions[2] && latestVersions[2] > currentVersions[2]) {
                            failed = true;
                            if (options.failAtPatch) {
                                valid = false;
                            }
                            if (options.console) {
                                results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": colors && colors.yellow ? colors.yellow(dependency.version + " < " + latest) : dependency.version + " < " + latest }));
                            }
                        }
                    }).then(() => {
                        if (!failed && options.console) {
                            results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": colors && colors.green ? colors.green("Ok") : "Ok" }));
                        }
                    });
                });
            });
        }).then(() => {
            return _execute(deps);
        });
    }
    return _execute([...dependencies]).then(() => {
        (0, sortDeps_1.default)(results).forEach((r) => {
            console.log(r.time, r.path, "=>", r.result);
        });
        return valid;
    });
}
exports.default = checkDependenciesUpdates;
;

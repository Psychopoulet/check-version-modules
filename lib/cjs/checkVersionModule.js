"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const extractAndFormateDeps_1 = __importDefault(require("./deps/extractAndFormateDeps"));
const checkDependenciesUpdates_1 = __importDefault(require("./deps/checkDependenciesUpdates"));
const checkFile_1 = __importDefault(require("./utils/checkFile"));
const checkAndFormateOptions_1 = __importDefault(require("./utils/checkAndFormateOptions"));
const getFormatedTime_1 = __importDefault(require("./utils/getFormatedTime"));
;
// module
function checkVersionModule(file, opts) {
    // check params
    return Promise.resolve().then(() => {
        return (0, checkFile_1.default)(file);
    }).then(() => {
        return (0, checkAndFormateOptions_1.default)(opts);
    }).then((options) => {
        return (0, extractAndFormateDeps_1.default)(file, options.dev).then((dependencies) => {
            if (options.console) {
                console.log((0, getFormatedTime_1.default)(), file);
            }
            return (0, checkDependenciesUpdates_1.default)(dependencies, {
                "failAtMajor": options.failAtMajor,
                "failAtMinor": options.failAtMinor,
                "failAtPatch": options.failAtPatch,
                "console": options.console,
                "dev": options.dev
            });
        });
    });
}
exports.default = checkVersionModule;
;

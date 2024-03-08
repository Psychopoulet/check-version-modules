"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const extractAndFormateDeps_1 = __importDefault(require("./deps/extractAndFormateDeps"));
const checkDependenciesUpdates_1 = __importDefault(require("./deps/checkDependenciesUpdates"));
const checkFile_1 = __importDefault(require("./utils/checkFile"));
const checkAndFormateOptions_1 = __importDefault(require("./utils/checkAndFormateOptions"));
// module
function checkVersionModule(file, opts) {
    // check params
    return Promise.resolve().then(() => {
        return (0, checkFile_1.default)(file);
    }).then(() => {
        return (0, checkAndFormateOptions_1.default)(opts);
    }).then((options) => {
        return (0, extractAndFormateDeps_1.default)(file, options.dev).then((dependencies) => {
            return (0, checkDependenciesUpdates_1.default)(dependencies, options);
        });
    });
}
exports.default = checkVersionModule;

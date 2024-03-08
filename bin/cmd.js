#!/usr/bin/env node

// deps

    // natives
    const { join } = require("node:path");
    const { EOL } = require("node:os");

    // externals

    let colors = null;
    try { // test require optional deps
        colors = require("colors/safe");
    }
    catch (e) {
        // nothing to do here
    }

    // locals
    const colorizeFormattedTime = require(join(__dirname, "colorizeFormattedTime.js"));
    const checker = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));
    const getFormatedTime = require(join(__dirname, "..", "lib", "cjs", "utils", "getFormatedTime.js"));

// consts

    const ARGS = (0, process).argv.slice(2, (0, process).argv.length);

// module

Promise.resolve().then(() => {

    const errors = [];
    let file = "";
    const options = {};

        ARGS.forEach((arg, i) => {

            if ("--" !== arg && arg.startsWith("--")) {

                switch (arg) {

                    case "--fail-at-major":
                        options.failAtMajor = true;
                    break;
                    case "--no-fail-at-major":
                        options.failAtMajor = false;
                    break;

                    case "--fail-at-minor":
                        options.failAtMinor = true;
                    break;
                    case "--no-fail-at-minor":
                        options.failAtMinor = false;
                    break;

                    case "--fail-at-patch":
                        options.failAtPatch = true;
                    break;
                    case "--no-fail-at-patch":
                        options.failAtPatch = false;
                    break;

                    case "--dev":
                        options.dev = true;
                    break;
                    case "--no-dev":
                        options.dev = false;
                    break;

                    case "--npmrcFile":

                        if (i + 1 < ARGS.length) {
                            options.npmrcFile = String(ARGS[i + 1]);
                        }

                    break;

                    case "--file":

                        if (i + 1 < ARGS.length) {
                            file = String(ARGS[i + 1]);
                        }

                    break;

                    default:
                        errors.push(new RangeError("Unknown \"" + String(arg) + "\" argument"));
                    break;

                }

            }

        });

        if ("" === file) {
            file = join((0, process).cwd(), "package.json");
        }

    (0, console).log(getFormatedTime.default(), file);

    return errors.length
        ? Promise.reject(new Error(errors.join(EOL)))
        : checker(file, options).then((analyse) => {

            analyse.results.forEach((result) => {

                switch (result.result) {

                    case "fail_major":

                        (0, console).error(
                            colorizeFormattedTime(result.time), result.path, "=>",
                            colors && colors.bgRed ? colors.bgRed(result.message) : result.message
                        );

                    break;

                    case "fail_minor":

                        (0, console).error(
                            colorizeFormattedTime(result.time), result.path, "=>",
                            colors && colors.red ? colors.red(result.message) : result.message
                        );

                    break;

                    case "fail_patch":
                    case "warning":

                        (0, console).warn(
                            colorizeFormattedTime(result.time), result.path, "=>",
                            colors && colors.yellow ? colors.yellow(result.message) : result.message
                        );

                    break;

                    case "success":

                        (0, console).log(
                            colorizeFormattedTime(result.time), result.path, "=>",
                            colors && colors.green ? colors.green(result.message) : result.message
                        );

                    break;

                    default:
                        (0, console).log(result.message);
                    break;

                }

            });

            if (analyse.result) {

                (0, process).exitCode = 0;
                (0, process).exit(0);

            }
            else {

                (0, process).exitCode = 2;
                (0, process).exit(2);

            }

        });

}).catch((err) => {

    (0, console).log("");
    (0, console).error(err.message ? err.message : err);

    (0, process).exitCode = 1;
    (0, process).exit(1);

});

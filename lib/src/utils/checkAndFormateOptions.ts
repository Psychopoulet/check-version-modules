// deps

    // locals
    import checkBoolean from "./checkBoolean";
    import checkNonNullPureObject from "./checkNonNullPureObject";

// types & interfaces

    // locals
    import type { iOptions, iFormattedOptions } from "../checkVersionModule";

// consts

    const DEFAULT_OPTIONS: iFormattedOptions = {
        "failAtMajor": true,
        "failAtMinor": true,
        "failAtPatch": false,
        "dev": true,
        "npmrcFile": ""
    };

// module

export default function checkAndFormateOptions (options: iOptions = DEFAULT_OPTIONS): Promise<iFormattedOptions> {

    return checkNonNullPureObject(options).then((): Promise<void> => {

        options.failAtMajor = "undefined" === typeof options.failAtMajor ? DEFAULT_OPTIONS.failAtMajor : options.failAtMajor;
        options.failAtMinor = "undefined" === typeof options.failAtMinor ? DEFAULT_OPTIONS.failAtMinor : options.failAtMinor;
        options.failAtPatch = "undefined" === typeof options.failAtPatch ? DEFAULT_OPTIONS.failAtPatch : options.failAtPatch;
        options.dev = "undefined" === typeof options.dev ? DEFAULT_OPTIONS.dev : options.dev;
        options.npmrcFile = "undefined" === typeof options.npmrcFile ? DEFAULT_OPTIONS.npmrcFile : options.npmrcFile;

        return checkBoolean(options.failAtMajor);

    }).then((): Promise<void> => {

        return checkBoolean(options.failAtMinor);

    }).then((): Promise<void> => {

        return checkBoolean(options.failAtPatch);

    }).then((): Promise<void> => {

        return checkBoolean(options.dev);

    }).then((): Promise<iFormattedOptions> => {

        return Promise.resolve(options as iFormattedOptions);

    });

}

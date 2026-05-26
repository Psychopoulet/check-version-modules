// deps

    // externals
    import semver from "semver";

    // natives
    import { basename, join } from "node:path";
    import { mkdir, copyFile, readFile, rm } from "node:fs/promises";
    import { homedir } from "node:os";
    import { exec, execFile } from "node:child_process";

// types & interfaces

    // locals
    type iPackageData = Record<string, object | string | number | boolean>;
    type iDependencies = Record<string, string>;

// module

export default function downloadPrivatePackageLastVersion (packageName: string, npmrcFile: string): Promise<string> {

    const baseDir: string = join(homedir(), "check-version-modules");
    const packageDir: string = join(baseDir, (Math.random() + 1).toString(36).substring(2));

    return mkdir(packageDir, {
        "recursive": true
    }).then((): Promise<void> => {
        return "" !== npmrcFile ? copyFile(npmrcFile, join(packageDir, basename(npmrcFile))) : Promise.resolve();
    }).then((): Promise<void> => {

        return new Promise((resolve: () => void, reject: (err: Error) => void): void => {

            exec("npm init --yes", {
                "cwd": packageDir,
                "windowsHide": true
            }, (err: Error | null, stdout: string, stderr: string): void => {

                if (err) {
                    reject(err);
                }
                else if (stderr) {
                    reject(new Error(stderr));
                }
                else {
                    resolve();
                }

            });

        });

    }).then((): Promise<void> => {

        return new Promise((resolve: () => void, reject: (err: Error) => void): void => {

            execFile("npm", [ "install", packageName ], {
                "cwd": packageDir,
                "windowsHide": true
            }, (err: Error | null): void => {

                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }

            });

        });

    }).then((): Promise<string> => {

        return readFile(join(packageDir, "package.json"), "utf8");

    }).then((content: string) : Promise<iPackageData> => {

        return "" === content.trim()
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not return data"))
            : Promise.resolve(JSON.parse(content) as iPackageData);

    }).then((parsedData: iPackageData): Promise<iDependencies> => {

        return "undefined" === typeof parsedData.dependencies
            ? Promise.reject(new Error("\"" + packageName + "\" installation does not get dependencies"))
            : Promise.resolve(parsedData.dependencies as iDependencies);

    }).then((deps: iDependencies): Promise<string> => {

        if (!deps[packageName]) {
            return Promise.reject(new Error("\"" + packageName + "\" installation does not get \"" + packageName + "\" dependency"));
        }

        const coercedVersion: semver.SemVer | null = semver.coerce(deps[packageName]);

        return null === coercedVersion
            ? Promise.reject(new Error("\"" + packageName + "\" installation does not return a valid version for \"" + packageName + "\""))
            : Promise.resolve(coercedVersion.version);

    }).then((data: string): Promise<string> => {

        return rm(packageDir, {
            "recursive": true
        }).then((): Promise<string> => {
            return Promise.resolve(data);
        });

    }).catch((err: Error): Promise<string> => {

        return rm(packageDir, {
            "recursive": true
        }).then((): Promise<string> => {
            return Promise.reject(err);
        });

    });

}

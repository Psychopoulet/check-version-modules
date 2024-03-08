// deps

    // locals
    import downloadPublicPackageLastVersion from "./downloadpackage/downloadPublicPackageLastVersion";
    import downloadPrivatePackageLastVersion from "./downloadpackage/downloadPrivatePackageLastVersion";

// types & interfaces

    interface iModule {
        "name": string;
        "latestVersion": string;
    }

// private

    // attributes

        const _alreadyDownloaded: iModule[] = [];

// module

export default function downloadPackageData (packageName: string, npmrcFile: string): Promise<string> {

    const searchedModule: iModule | undefined = _alreadyDownloaded.filter((m: iModule): boolean => {
        return m.name === packageName;
    }).shift();

    return "undefined" !== typeof searchedModule ? Promise.resolve(searchedModule.latestVersion) : new Promise((resolve: (content: string) => void, reject: (err: Error) => void): undefined => {

        downloadPublicPackageLastVersion(packageName).then(resolve).catch((err: Error): undefined => {

            downloadPrivatePackageLastVersion(packageName, npmrcFile).then(resolve).catch((): undefined => {
                reject(err);
            });

        });

    }).then((latestVersion: string): string => {

        _alreadyDownloaded.push({
            "name": packageName,
            "latestVersion": latestVersion
        });

        return latestVersion;

    });

}

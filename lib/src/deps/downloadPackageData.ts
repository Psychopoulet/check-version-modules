// deps

    // locals
    import checkPackageName from "./downloadpackage/checkPackageName";
    import downloadPublicPackageLastVersion from "./downloadpackage/downloadPublicPackageLastVersion";
    import downloadPrivatePackageLastVersion from "./downloadpackage/downloadPrivatePackageLastVersion";

// types & interfaces

    interface iModule {
        "name": string;
        "latestVersion": string;
    }

// private

    // attributes

        const _alreadyDownloaded: Map<string, iModule> = new Map<string, iModule>();

// module

export default function downloadPackageData (packageName: string, npmrcFile: string): Promise<string> {

    if (_alreadyDownloaded.has(packageName)) {
        return Promise.resolve((_alreadyDownloaded.get(packageName) as iModule).latestVersion);
    }

    return checkPackageName(packageName).then(() => {

        return new Promise((resolve: (content: string) => void, reject: (err: Error) => void): void => {

            downloadPublicPackageLastVersion(packageName).then(resolve).catch((err: Error): void => {

                downloadPrivatePackageLastVersion(packageName, npmrcFile).then(resolve).catch((): void => {
                    return reject(err);
                });

            });

        }).then((latestVersion: string): string => {

            _alreadyDownloaded.set(packageName, {
                "name": packageName,
                "latestVersion": latestVersion
            });

            return latestVersion;

        });

    });

}

// types & interfaces

    export interface iDep {
        "dev": boolean;
        "name": string;
        "version": string;
        "path": string;
    }

// module

export default function formateDeps (packageData: Record<string, object | string | number | boolean>, dev: boolean): iDep[] {

    const packageDependencies: Record<string, string> = packageData.dependencies as Record<string, string>;

    let result: iDep[] = Object.keys(packageDependencies).map((dependency: string): iDep => {

        return {
            "dev": false,
            "name": dependency,
            "version": packageDependencies[dependency],
            "path": dependency
        };

    });

        if (dev && "object" === typeof packageData.devDependencies) {

            const packageDevDependencies: Record<string, string> = packageData.devDependencies as Record<string, string>;

            result = result.concat(Object.keys(packageDevDependencies).map((dependency: string): iDep => {

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

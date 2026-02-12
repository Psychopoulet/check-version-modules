// types & interfaces

    export interface iDep {
        "dev": boolean;
        "optional": boolean;
        "name": string;
        "version": string;
        "path": string;
    }

// module

export default function formateDeps (packageData: Record<string, object | string | number | boolean>, dev: boolean, optional: boolean): iDep[] {

    let result: iDep[] = [];

        if ("object" === typeof packageData.devDependencies) {

            const packageDependencies: Record<string, string> = packageData.dependencies as Record<string, string>;

            result = Object.keys(packageDependencies).map((dependency: string): iDep => {

                return {
                    "dev": false,
                    "optional": false,
                    "name": dependency,
                    "version": packageDependencies[dependency],
                    "path": dependency
                };

            });

        }

        if (dev && "object" === typeof packageData.devDependencies) {

            const packageDevDependencies: Record<string, string> = packageData.devDependencies as Record<string, string>;

            result = result.concat(Object.keys(packageDevDependencies).map((dependency: string): iDep => {

                return {
                    "dev": true,
                    "optional": false,
                    "name": dependency,
                    "version": packageDevDependencies[dependency],
                    "path": "dev/" + dependency
                };

            }));

        }

        if (optional && "object" === typeof packageData.optionalDependencies) {

            const packageOptionalDependencies: Record<string, string> = packageData.optionalDependencies as Record<string, string>;

            result = result.concat(Object.keys(packageOptionalDependencies).map((dependency: string): iDep => {

                return {
                    "dev": false,
                    "optional": true,
                    "name": dependency,
                    "version": packageOptionalDependencies[dependency],
                    "path": "optional/" + dependency
                };

            }));

        }

    return result;

}

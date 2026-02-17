// types & interfaces

    interface iPackageDeps {
        "dependencies"?: Record<string, string>,
        "devDependencies"?: Record<string, string>,
        "optionalDependencies"?: Record<string, string>
    }

    export interface iDep {
        "dev": boolean;
        "optional": boolean;
        "name": string;
        "version": string;
        "path": string;
    }

// module

export default function formateDeps (packageData: Record<string, unknown>, dev: boolean, optional: boolean): iDep[] {

    let result: iDep[] = [];

        const {
            dependencies,
            devDependencies,
            optionalDependencies
        }: iPackageDeps = packageData as unknown as iPackageDeps;

        if ("object" === typeof dependencies) {

            result = Object.keys(dependencies).map((dependency: string): iDep => {

                return {
                    "dev": false,
                    "optional": false,
                    "name": dependency,
                    "version": dependencies[dependency],
                    "path": dependency
                };

            });

        }

        if (dev && "object" === typeof devDependencies) {

            result = result.concat(Object.keys(devDependencies).map((dependency: string): iDep => {

                return {
                    "dev": true,
                    "optional": false,
                    "name": dependency,
                    "version": devDependencies[dependency],
                    "path": "dev/" + dependency
                };

            }));

        }

        if (optional && optionalDependencies) {

            result = result.concat(Object.keys(optionalDependencies).map((dependency: string): iDep => {

                return {
                    "dev": false,
                    "optional": true,
                    "name": dependency,
                    "version": optionalDependencies[dependency],
                    "path": "optional/" + dependency
                };

            }));

        }

    return result;

}

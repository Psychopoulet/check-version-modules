"use strict";

// types & interfaces

	export interface iDep {
		"dev": boolean;
		"name": string;
		"version": string;
		"path": string;
	};

// module

export default function formateDeps (packageData: { [key:string]: any }, dev: boolean): Array<iDep> {

	const packageDependencies: { [key:string]: string } = packageData.dependencies;

	let result: Array<iDep> = Object.keys(packageDependencies).map((dependency: string): iDep => {

		return {
			"dev": false,
			"name": dependency,
			"version": packageDependencies[dependency],
			"path": dependency
		};

	});

		if (dev && packageData.devDependencies) {

			const packageDevDependencies: { [key:string]: string } = packageData.devDependencies;

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

};

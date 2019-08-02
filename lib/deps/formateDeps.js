/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// module

module.exports = function formateDeps (packageData, dev) {

	const packageDependencies = packageData.dependencies;

	let result = Object.keys(packageDependencies).map(function formateDependencies (dependency) {

		return {
			"dev": false,
			"name": dependency,
			"version": packageDependencies[dependency]
		};

	});

		if (dev && packageData.devDependencies) {

			const packageDevDependencies = packageData.devDependencies;

			result = result.concat(Object.keys(packageDevDependencies).map(function formateDevDependencies (dependency) {

				return {
					"dev": true,
					"name": dependency,
					"version": packageDevDependencies[dependency]
				};

			}));

		}

	return result;

};

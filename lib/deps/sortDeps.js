/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// module

module.exports = function sortDeps (dependencies) {

	return dependencies.sort(function sort (compared, compareTo) {

		if (compared.dev && !compareTo.dev) {
			return 1;
		}
		else if (!compared.dev && compareTo.dev) {
			return -1;
		}
			else if (compared.name > compareTo.name) {
				return 1;
			}
			else if (compared.name < compareTo.name) {
				return -1;
			}
				else {
					return 0;
				}

	}).map(function formate (dependency) {

		let path = dependency.name;
		path = dependency.dev ? "dev/" + path : path;

		return {
			path,
			"name": dependency.name,
			"version": dependency.version
		};

	});

};

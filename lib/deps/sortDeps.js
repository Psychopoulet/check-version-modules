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

	});

};

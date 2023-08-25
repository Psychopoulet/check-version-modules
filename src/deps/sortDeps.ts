"use strict";

// types & interfaces

	import { iDep } from "./formateDeps";

// module

export default function sortDeps (dependencies: Array<iDep>): Array<iDep> {

	return dependencies.sort((compared: iDep, compareTo: iDep) => {

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

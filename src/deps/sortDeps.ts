"use strict";

// types & interfaces

	// locals
	import { iDep, iResult } from "./formateDeps";

// module

export default function sortDeps (dependencies: Array<iDep|iResult>): Array<iDep|iResult> {

	return dependencies.sort((compared: iDep|iResult, compareTo: iDep|iResult) => {

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

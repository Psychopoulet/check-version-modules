"use strict";

// deps

	// locals
	import checkVersionValidity from "./checkVersionValidity";
	import formateVersion from "./formateVersion";

// module

export default function checkAndFormateVersion (version: string): Promise<string> {

	return checkVersionValidity(version).then((): string => {

		return formateVersion(version);

	});

};

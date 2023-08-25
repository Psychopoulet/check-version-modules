"use strict";

// deps

	// natives
	import { readFile } from "node:fs/promises";

	// locals
	import formateDeps from "./formateDeps";
	import sortDeps from "./sortDeps";

// types & interfaces

	// locals
	import { iDep } from "./formateDeps";

// module

export default function extractAndFormateDeps (file: string, dev: boolean): Promise<Array<iDep>> {

	return readFile(file, "utf-8").then((content: string): { [key:string]: any } => {
		return JSON.parse(content);
	}).then((packageData: { [key:string]: any }): Array<iDep> => {

		return formateDeps(packageData, dev);

	}).then((dependencies: Array<iDep>): Array<iDep> => {

		return sortDeps(dependencies);

	});

};

"use strict";

// deps

	// externals

	let colors: { [key:string]: (msg: string) => string } | null = null;
	try { // test require optional deps
		colors = require("colors/safe");
	}
	catch (e) {
		// nothing to do here
	}

	// locals
	import padleft from "./padleft";

// module

export default function getFormatedTime (): string {

	const date: Date = new Date();

	const content: string =
		padleft(date.getHours()) + ":" +
		padleft(date.getMinutes()) + ":" +
		padleft(date.getSeconds());

	return (colors && colors.white ? colors.white("[") : "[") +
		(colors && colors.grey ? colors.grey(content) : content) +
	(colors && colors.white ? colors.white("]") : "]");

};

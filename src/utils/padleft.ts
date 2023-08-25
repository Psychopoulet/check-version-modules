"use strict";

// module

export default function padleft (msg: string | number): string {

	if ("string" === typeof msg) {
		return 2 > msg.length ? "0" + msg : msg;
	}
	else {
		return padleft(String(msg));
	}

};

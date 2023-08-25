"use strict";

// deps

	// natives
	import { get } from "node:https";

// types & interfaces

	// natives
	import { IncomingMessage } from "node:http";

	interface iModule {
		"name": string;
		"latestVersion": string;
	};

// private

	// attributes

		const _alreadyDownloaded: Array<iModule> = [];

// module

export default function downloadPackageData (packageName: string): Promise<string> | string {

	const searchedModule: iModule | null = _alreadyDownloaded.filter((m: iModule): boolean => {
		return m.name === packageName;
	})[0] || null;

	return searchedModule ? searchedModule.latestVersion : new Promise((resolve: (content: string) => void, reject: (err: Error) => void): void => {

		get("https://registry.npmjs.org/" + packageName, (res: IncomingMessage): void => {

			if (200 !== res.statusCode) {
				res.resume();
				reject(new Error("Impossible to join \"" + packageName + "\" registry"));
			}
			else {

				res.setEncoding("utf8");

				let rawData = "";
				res.on("data", function requestData (chunk) {
					rawData += chunk;
				}).on("end", function requestEnd () {
					resolve(rawData);
				});

			}

		}).on("error", reject);

	}).then((data: string): Promise<{ [key:string]: any }> => {

		return "" === data.trim() ?
			Promise.reject(new Error("\"" + packageName + "\" registry does not return data")) :
			Promise.resolve(JSON.parse(data));

	}).then((data: { [key:string]: any }): Promise<string> => {

		return !data["dist-tags"] || !data["dist-tags"].latest ?
			Promise.reject(new Error("\"" + packageName + "\" registry does not return latest version")) :
			Promise.resolve(data["dist-tags"].latest);

	}).then((latestVersion: string): string => {

		_alreadyDownloaded.push({
			"name": packageName,
			"latestVersion": latestVersion
		});

		return latestVersion;

	});

};

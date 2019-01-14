declare module "check-version-modules" {

	// interfaces

	interface iOptions {
		"failAtMajor": boolean;
		"failAtMinor": boolean;
		"failAtPatch": boolean;
		"dev": boolean;
		"console": boolean;
	}

	// module

	function checker (file: string, options?: iOptions): Promise<boolean>;

	export = checker;

}

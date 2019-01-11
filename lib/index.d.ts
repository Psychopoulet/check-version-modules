declare module "check-version-modules" {

	function checker (file: string): Promise<boolean>;

	export = checker;

}

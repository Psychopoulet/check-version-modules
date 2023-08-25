import { iDep } from "./formateDeps";
import { iOptions } from "../checkVersionModule";
export default function checkDependenciesUpdates(dependencies: Array<iDep>, options: iOptions): Promise<boolean>;

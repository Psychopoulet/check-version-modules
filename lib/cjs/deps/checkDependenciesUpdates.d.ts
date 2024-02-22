import type { iDep } from "./formateDeps";
import type { iOptions } from "../checkVersionModule";
export interface iResult extends iDep {
    "time": string;
    "result": "success" | "warning" | "fail_patch" | "fail_minor" | "fail_major";
    "message": string;
}
export interface iAnalyze {
    "result": boolean;
    "results": iResult[];
}
export default function checkDependenciesUpdates(dependencies: iDep[], options: iOptions): Promise<iAnalyze>;

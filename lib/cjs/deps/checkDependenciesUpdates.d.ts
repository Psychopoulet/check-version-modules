import { iDep } from "./formateDeps";
import { iOptions } from "../checkVersionModule";
export interface iResult extends iDep {
    "time": string;
    "result": "success" | "warning" | "fail_patch" | "fail_minor" | "fail_major";
    "message": string;
}
export interface iAnalyze {
    "result": boolean;
    "results": Array<iResult>;
}
export default function checkDependenciesUpdates(dependencies: Array<iDep>, options: iOptions): Promise<iAnalyze>;

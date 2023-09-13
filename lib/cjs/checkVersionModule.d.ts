export interface iOptions {
    "failAtMajor": boolean;
    "failAtMinor": boolean;
    "failAtPatch": boolean;
    "dev": boolean;
}
import { iAnalyze } from "./deps/checkDependenciesUpdates";
export default function checkVersionModule(file: string, opts?: iOptions): Promise<iAnalyze>;

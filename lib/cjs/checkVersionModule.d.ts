import { type iAnalyze } from "./deps/checkDependenciesUpdates";
export interface iOptions {
    "failAtMajor"?: boolean;
    "failAtMinor"?: boolean;
    "failAtPatch"?: boolean;
    "dev"?: boolean;
    "optional"?: boolean;
    "npmrcFile"?: string;
}
export interface iFormattedOptions {
    "failAtMajor": boolean;
    "failAtMinor": boolean;
    "failAtPatch": boolean;
    "dev": boolean;
    "optional": boolean;
    "npmrcFile": string;
}
export default function checkVersionModule(file: string, opts?: iOptions): Promise<iAnalyze>;

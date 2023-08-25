export interface iOptions {
    "failAtMajor": boolean;
    "failAtMinor": boolean;
    "failAtPatch": boolean;
    "dev": boolean;
    "console": boolean;
}
export default function checkVersionModule(file: string, opts?: iOptions): Promise<boolean>;

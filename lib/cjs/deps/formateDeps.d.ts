export interface iDep {
    "dev": boolean;
    "optional": boolean;
    "name": string;
    "version": string;
    "path": string;
}
export default function formateDeps(packageData: Record<string, unknown>, dev: boolean, optional: boolean): iDep[];

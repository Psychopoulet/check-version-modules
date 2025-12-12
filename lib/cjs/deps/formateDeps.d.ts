export interface iDep {
    "dev": boolean;
    "optional": boolean;
    "name": string;
    "version": string;
    "path": string;
}
export default function formateDeps(packageData: Record<string, object | string | number | boolean>, dev: boolean, optional: boolean): iDep[];

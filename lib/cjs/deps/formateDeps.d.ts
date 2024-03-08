export interface iDep {
    "dev": boolean;
    "name": string;
    "version": string;
    "path": string;
}
export default function formateDeps(packageData: Record<string, object | string | number | boolean>, dev: boolean): iDep[];

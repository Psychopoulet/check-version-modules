export interface iDep {
    "dev": boolean;
    "name": string;
    "version": string;
    "path": string;
}
export default function formateDeps(packageData: Record<string, any>, dev: boolean): iDep[];

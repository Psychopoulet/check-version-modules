export interface iDep {
    "dev": boolean;
    "name": string;
    "version": string;
    "path": string;
}
export default function formateDeps(packageData: {
    [key: string]: any;
}, dev: boolean): Array<iDep>;

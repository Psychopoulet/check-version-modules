export interface iDep {
    "dev": boolean;
    "name": string;
    "version": string;
    "path": string;
}
export interface iResult extends iDep {
    "time": string;
    "result": string;
}
export default function formateDeps(packageData: {
    [key: string]: any;
}, dev: boolean): Array<iDep>;

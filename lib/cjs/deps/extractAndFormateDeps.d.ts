import type { iDep } from "./formateDeps";
export default function extractAndFormateDeps(file: string, dev: boolean, optional: boolean): Promise<iDep[]>;

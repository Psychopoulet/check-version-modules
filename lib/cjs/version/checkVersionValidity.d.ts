export default function checkVersionValidity(version: string, strict?: boolean): Promise<"RUNNABLE" | "ALWAYS_UP_TO_UPDATE" | "NOT_RUNNABLE">;

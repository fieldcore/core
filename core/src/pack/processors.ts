import { BaseProcessor } from "../../lib";

export interface CapitalizeProcessor extends BaseProcessor<{ input: string }> {
    pack: "test";
    subtype: "caps";
}

export function Capitalizer(options: { input: string }): string {
    return (options.input ?? "").toUpperCase();
}

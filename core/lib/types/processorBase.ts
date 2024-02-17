export interface BaseProcessor<TOps extends object = any> {
    type: "processor";
    subtype: string;
    pack: string;
    defaultOptions?: Partial<TOps>;
}

export function isProcessor<T extends BaseProcessor = any>(obj: any): obj is T {
    return obj.type === "processor";
}

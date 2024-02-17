export interface BaseProcessor<TOps extends object = any, TReturn = any> {
    type: "processor";
    subtype: string;
    pack: string;
    defaultOptions?: Partial<TOps>;
    execute: (options: TOps) => TReturn;
}

export function isProcessor<T extends BaseProcessor = any>(obj: any): obj is T {
    return obj.type === "processor" && Object.keys(obj).includes("execute");
}

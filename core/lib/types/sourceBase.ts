import { DataType } from "./data";

export interface BaseSource<TE, TS> {
    type: "source";
    subtype: string;
    pack: string;
    renderer: TE | TS;
    root: string;
    data: DataType;
}

export function isSource<
    TSource extends BaseSource<any, any> = BaseSource<any, any>
>(obj: any): obj is TSource {
    return obj.type === "source";
}

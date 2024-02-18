import { DataType } from "./data";
import { BaseProcessor } from "./processorBase";

export interface BaseSource<TE, TS, TP extends BaseProcessor<any>> {
    type: "source";
    subtype: string;
    pack: string;
    renderer: TE | TS;
    root: string;
    data: DataType<TP>;
}

export function isSource<
    TSource extends BaseSource<any, any, any> = BaseSource<any, any, any>
>(obj: any): obj is TSource {
    return obj.type === "source";
}

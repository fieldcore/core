import { isArray, isBoolean, isNumber, isString } from "lodash";
import { BaseProcessor, isProcessor } from "./processorBase";

export type DataTypeLiteral = string | number | boolean;
export type DataTypePath<T extends DataType = DataTypeLiteral> = {
    type: "data";
    subtype: "path";
    path: string;
    default?: T;
    relative?: boolean;
    sourced?: boolean;
};
export type DataTypeProcessor<
    TP extends BaseProcessor,
    T extends DataType = DataTypeLiteral
> = {
    type: "data";
    subtype: "processor";
    processor: TP;
    options?: { [key: string]: DataType } | TP["defaultOptions"];
    default?: T;
};
export type DataTypeArray<T extends DataType = DataTypeLiteral> = T[];
export type DataType<TP extends BaseProcessor = any> =
    | DataTypeLiteral
    | DataTypePath
    | DataTypeProcessor<TP>;

export function isLiteralDataType<T extends DataTypeLiteral = DataTypeLiteral>(
    obj: any
): obj is T {
    return isString(obj) || isNumber(obj) || isBoolean(obj);
}

export function isPathDataType<T extends DataTypePath = DataTypePath>(
    obj: any
): obj is T {
    return obj.type === "data" && obj.subtype === "path" && isString(obj.path);
}

export function isProcessorDataType<
    T extends DataTypeProcessor<any> = DataTypeProcessor<any>
>(obj: any): obj is T {
    return (
        obj.type === "data" &&
        obj.subtype === "processor" &&
        isProcessor(obj.processor)
    );
}

export function isArrayDataType<T extends DataType = DataType>(
    obj: any
): obj is T[] {
    return isArray(obj) && obj.every((v) => isDataType<T>(v));
}

export function isDataType<T extends DataType = DataType>(obj: any): obj is T {
    return (
        isLiteralDataType(obj) ||
        isPathDataType(obj) ||
        isProcessorDataType(obj) ||
        isArrayDataType(obj)
    );
}

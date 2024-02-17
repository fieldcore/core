import { isArray, isBoolean, isNumber, isString } from "lodash";
import { BaseProcessor, isProcessor } from "./processorBase";

export type DataTypeLiteral = string | number | boolean;
export type DataTypePath<T extends DataType = any> = {
    type: "data";
    subtype: "path";
    path: string;
    default?: T;
};
export type DataTypeProcessor<T extends DataType = any> = {
    type: "data";
    subtype: "processor";
    processor: BaseProcessor;
    options?: { [key: string]: DataType };
    default?: T;
};
export type DataTypeArray<T extends DataType = any> = T[];
export type DataType<T extends DataType = any> =
    | DataTypeLiteral
    | DataTypePath<T>
    | DataTypeProcessor<T>;

export function isLiteralDataType<T extends DataTypeLiteral = any>(
    obj: any
): obj is T {
    return isString(obj) || isNumber(obj) || isBoolean(obj);
}

export function isPathDataType<T extends DataTypePath = any>(
    obj: any
): obj is T {
    return obj.type === "data" && obj.subtype === "path" && isString(obj.path);
}

export function isProcessorDataType<T extends DataTypeProcessor = any>(
    obj: any
): obj is T {
    return (
        obj.type === "data" &&
        obj.subtype === "processor" &&
        isProcessor(obj.processor)
    );
}

export function isArrayDataType<T extends DataType = any>(
    obj: any
): obj is T[] {
    return isArray(obj) && obj.every((v) => isDataType<T>(v));
}

export function isDataType<T extends DataType = any>(obj: any): obj is T {
    return (
        isLiteralDataType(obj) ||
        isPathDataType(obj) ||
        isProcessorDataType(obj) ||
        isArrayDataType(obj)
    );
}

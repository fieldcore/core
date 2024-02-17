import { get, isEqual, isUndefined } from "lodash";
import { FieldCoreContext, FieldCoreContextType } from "../types/context";
import {
    DataType,
    DataTypeLiteral,
    isArrayDataType,
    isLiteralDataType,
    isPathDataType,
    isProcessorDataType,
} from "../types/data";
import { useContext, useEffect, useRef, useState } from "react";
import { parseProcessor } from "./processor";

export function parseData(context: FieldCoreContextType, data: DataType): any {
    if (isLiteralDataType<DataTypeLiteral>(data)) {
        return data;
    }

    if (isArrayDataType<DataType>(data)) {
        return data.map((v) => parseData(context, v));
    }

    if (isPathDataType(data)) {
        return get(
            context.data,
            data.relative && context.root
                ? `${context.root}.${data.path}`
                : data.path,
            data.default
        );
    }

    if (isProcessorDataType(data)) {
        const processor = context.packs[data.processor.pack].processors[
            data.processor.subtype
        ] as Function | undefined;
        if (!processor) {
            return !isUndefined(data.default)
                ? parseData(context, data.default)
                : null;
        }
        return parseProcessor(data.processor, context, data.options);
    }

    return data;
}

export function useDataType(data: DataType): any {
    const context = useContext(FieldCoreContext);
    const [output, setOutput] = parseData(context, data);

    const prevData = useRef<typeof data>(data);
    const prevContext = useRef<FieldCoreContextType>(context);

    useEffect(() => {
        if (isEqual(data, prevData) || isEqual(context, prevContext)) {
            return;
        }

        prevData.current = data;
        prevContext.current = context;
        setOutput(parseData(context, data));
    }, [data, context]);

    return output;
}

export function useDataTypes(data: { [key: string]: DataType }): {
    [key: string]: any;
} {
    const context = useContext(FieldCoreContext);
    const [output, setOutput] = useState(
        Object.entries(data).reduce(
            (previous, current) => ({
                ...previous,
                [current[0]]: parseData(context, current[1]),
            }),
            {}
        )
    );

    const prevData = useRef<typeof data>(data);
    const prevContext = useRef<FieldCoreContextType>(context);

    useEffect(() => {
        if (isEqual(data, prevData) || isEqual(context, prevContext)) {
            return;
        }

        prevData.current = data;
        prevContext.current = context;
        setOutput(
            Object.entries(data).reduce(
                (previous, current) => ({
                    ...previous,
                    [current[0]]: parseData(context, current[1]),
                }),
                {}
            )
        );
    }, [data, context]);

    return output;
}

import { FieldCoreContextType } from "../types/context";
import { DataType } from "../types/data";
import { BaseProcessor } from "../types/processorBase";
import { parseData } from "./data";

export function parseProcessor(
    processor: BaseProcessor,
    context: FieldCoreContextType<any, any, any>,
    options?: { [key: string]: DataType }
): any {
    const parsedOptions = Object.entries(
        options ?? processor.defaultOptions ?? {}
    ).reduce(
        (previous, current) => ({
            ...previous,
            [current[0]]: parseData(context, current[1]),
        }),
        {}
    );
    const executor =
        context.packs[processor.pack].processors[processor.subtype];
    return parseData(context, executor(parsedOptions));
}

import { BaseSource, FieldCoreContextType } from "../../lib";
import { ElementTypes } from "./elements/types";
import { CapitalizeProcessor } from "./processors";

export interface StringSource
    extends BaseSource<ElementTypes, StringSource, CapitalizeProcessor> {
    pack: "test";
    subtype: "string";
}

export function StringSourceGenerator(
    context: FieldCoreContextType<any, any, any>,
    source: StringSource | any,
    data: string
) {
    return data.split("");
}

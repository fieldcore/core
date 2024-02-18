import { FieldPack } from "../../lib";
import {
    FieldElementComponent,
    GroupElementComponent,
    TextElementComponent,
} from "./elements/elements";
import { ElementTypes } from "./elements/types";
import { CapitalizeProcessor, Capitalizer } from "./processors";
import { StringSource, StringSourceGenerator } from "./sources";

export const BasePack: FieldPack<
    ElementTypes,
    StringSource,
    CapitalizeProcessor
> = {
    elements: {
        group: GroupElementComponent,
        text: TextElementComponent,
        field: FieldElementComponent,
    },
    sources: {
        string: StringSourceGenerator as any,
    },
    processors: {
        caps: Capitalizer as any,
    },
};

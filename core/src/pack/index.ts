import { FieldPack } from "../../lib";
import {
    FieldElementComponent,
    GroupElementComponent,
    TextElementComponent,
} from "./elements/elements";
import { ElementTypes } from "./elements/types";

export const BasePack: FieldPack<ElementTypes, any> = {
    elements: {
        group: GroupElementComponent,
        text: TextElementComponent,
        field: FieldElementComponent,
    },
    sources: {},
    processors: {},
};

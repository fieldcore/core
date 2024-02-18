import {
    BaseContainerElement,
    BaseElement,
    BaseFieldElement,
    DataType,
} from "../../../lib";
import { CapitalizeProcessor } from "../processors";
import { StringSource } from "../sources";

export interface GroupElement
    extends BaseContainerElement<
        ElementTypes,
        StringSource,
        CapitalizeProcessor
    > {
    pack: "test";
    subtype: "group";
}

export interface TextElement
    extends BaseElement<ElementTypes, StringSource, CapitalizeProcessor> {
    pack: "test";
    subtype: "text";
    content: DataType;
}

export interface FieldElement
    extends BaseFieldElement<ElementTypes, StringSource, CapitalizeProcessor> {
    pack: "test";
    subtype: "field";
}

export type ElementTypes = GroupElement | TextElement | FieldElement;

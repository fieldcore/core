import {
    BaseContainerElement,
    BaseElement,
    BaseFieldElement,
    DataType,
} from "../../../lib";

export interface GroupElement extends BaseContainerElement<ElementTypes, {}> {
    pack: "test";
    subtype: "group";
}

export interface TextElement extends BaseElement<ElementTypes, any> {
    pack: "test";
    subtype: "text";
    content: DataType;
}

export interface FieldElement extends BaseFieldElement<ElementTypes, any> {
    pack: "test";
    subtype: "field";
}

export type ElementTypes = GroupElement | TextElement | FieldElement;

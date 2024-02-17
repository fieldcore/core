export interface BaseElement {
    type: "element";
    subtype: string;
    pack: string;
}

export interface BaseFieldElement<TValue = any> extends BaseElement {
    key: string;
    default?: TValue;
}

export interface BaseContainerElement<T extends BaseElement = BaseElement>
    extends BaseElement {
    children: T[];
}

export function isElement<T extends BaseElement = BaseElement>(
    obj: any
): obj is T {
    return obj.type === "element";
}

export function isFieldElement<T extends BaseFieldElement = BaseFieldElement>(
    obj: any
): obj is T {
    return Boolean(isElement(obj) && (obj as BaseFieldElement).key);
}

export function isContainerElement<
    T extends BaseContainerElement = BaseContainerElement
>(obj: any): obj is T {
    return Boolean(isElement(obj) && (obj as BaseContainerElement).children);
}

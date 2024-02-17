import { ReactNode } from "react";

// @ts-ignore
export interface BaseElement<TE, TS> {
    type: "element";
    subtype: string;
    pack: string;
}

export interface BaseFieldElement<TE, TS> extends BaseElement<TE, TS> {
    key: string;
    default?: any;
}

export interface BaseContainerElement<TE, TS> extends BaseElement<TE, TS> {
    children: (TE | TS)[];
}

export function isElement<
    T extends BaseElement<any, any> = BaseElement<any, any>
>(obj: any): obj is T {
    return obj.type === "element";
}

export function isFieldElement<
    T extends BaseFieldElement<any, any> = BaseFieldElement<any, any>
>(obj: any): obj is T {
    return Boolean(isElement(obj) && (obj as BaseFieldElement<any, any>).key);
}

export function isContainerElement<
    T extends BaseContainerElement<any, any> = BaseContainerElement<any, any>
>(obj: any): obj is T {
    return Boolean(
        isElement(obj) && (obj as BaseContainerElement<any, any>).children
    );
}

export type ElementProps<TE, TS, T extends BaseElement<TE, TS>> = Omit<
    T,
    "type" | "pack" | "subtype" | "children"
> & { children?: ReactNode[]; value?: any; onChange?: (value: any) => void };

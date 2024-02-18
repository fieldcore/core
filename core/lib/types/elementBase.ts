import { ReactNode } from "react";

// @ts-ignore
export interface BaseElement<TE, TS, TP> {
    type: "element";
    subtype: string;
    pack: string;
}

export interface BaseFieldElement<TE, TS, TP> extends BaseElement<TE, TS, TP> {
    key: string;
    default?: any;
}

export interface BaseContainerElement<TE, TS, TP>
    extends BaseElement<TE, TS, TP> {
    children: (TE | TS)[];
}

export function isElement<
    T extends BaseElement<any, any, any> = BaseElement<any, any, any>
>(obj: any): obj is T {
    return obj.type === "element";
}

export function isFieldElement<
    T extends BaseFieldElement<any, any, any> = BaseFieldElement<any, any, any>
>(obj: any): obj is T {
    return Boolean(
        isElement(obj) && (obj as BaseFieldElement<any, any, any>).key
    );
}

export function isContainerElement<
    T extends BaseContainerElement<any, any, any> = BaseContainerElement<
        any,
        any,
        any
    >
>(obj: any): obj is T {
    return Boolean(
        isElement(obj) && (obj as BaseContainerElement<any, any, any>).children
    );
}

export type ElementProps<TE, TS, TP, T extends BaseElement<TE, TS, TP>> = Omit<
    T,
    "type" | "pack" | "subtype" | "children"
> & { children?: ReactNode[]; value?: any; onChange?: (value: any) => void };

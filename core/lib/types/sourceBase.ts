import { BaseElement } from "./elementBase";

export interface BaseSource<TRenderer extends BaseElement = BaseElement> {
    type: "source";
    subtype: string;
    pack: string;
    renderer: TRenderer;
    resolve: () => TRenderer[];
}

export function isSource<TSource extends BaseSource = BaseSource>(
    obj: any
): obj is TSource {
    return obj.type === "source";
}

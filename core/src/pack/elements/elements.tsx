import { ElementProps } from "../../../lib";
import { ElementTypes, FieldElement, GroupElement, TextElement } from "./types";

export function GroupElementComponent(
    props: ElementProps<ElementTypes, any, GroupElement>
) {
    return <div>{props.children}</div>;
}

export function TextElementComponent(
    props: ElementProps<ElementTypes, any, TextElement>
) {
    return <p>{props.content as string}</p>;
}

export function FieldElementComponent(
    props: ElementProps<ElementTypes, any, FieldElement>
) {
    return (
        <input
            value={props.value ?? ""}
            onChange={(ev) => props.onChange && props.onChange(ev.target.value)}
        />
    );
}

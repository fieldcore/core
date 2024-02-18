import { ElementProps } from "../../../lib";
import { CapitalizeProcessor } from "../processors";
import { StringSource } from "../sources";
import { ElementTypes, FieldElement, GroupElement, TextElement } from "./types";

export function GroupElementComponent(
    props: ElementProps<
        ElementTypes,
        StringSource,
        CapitalizeProcessor,
        GroupElement
    >
) {
    return <div>{props.children}</div>;
}

export function TextElementComponent(
    props: ElementProps<
        ElementTypes,
        StringSource,
        CapitalizeProcessor,
        TextElement
    >
) {
    return <p>{props.content as string}</p>;
}

export function FieldElementComponent(
    props: ElementProps<
        ElementTypes,
        StringSource,
        CapitalizeProcessor,
        FieldElement
    >
) {
    return (
        <input
            value={props.value ?? ""}
            onChange={(ev) => props.onChange && props.onChange(ev.target.value)}
        />
    );
}

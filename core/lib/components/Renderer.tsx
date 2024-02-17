import { useContext } from "react";
import {
    BaseElement,
    isContainerElement,
    isFieldElement,
} from "../types/elementBase";
import { FieldCoreContext } from "../types/context";
import { get, omit } from "lodash";
import { useDataType, useDataTypes } from "../hooks/data";
import { BaseSource, isSource } from "../types/sourceBase";

export type Renderable<TE, TS> = BaseElement<TE, TS> | BaseSource<TE, TS>;

export function ElementRenderer<TE, TS>({
    element,
}: {
    element: BaseElement<TE, TS>;
}) {
    const context = useContext(FieldCoreContext);
    const _renderer =
        context.packs[element.pack]?.elements[element.subtype] ?? null;
    const Renderer: typeof _renderer | null = _renderer as
        | typeof _renderer
        | null;

    const rawProps = omit(
        element,
        "pack",
        "type",
        "subtype",
        "children",
        "key"
    );
    const parsedProps = useDataTypes(rawProps);

    if (Renderer) {
        if (isContainerElement(element)) {
            return (
                <div
                    className={`fieldcore-element-wrapper container pack-${element.pack} type-${element.subtype}`}
                >
                    <Renderer context={context} {...parsedProps}>
                        {element.children.map((v, i) => (
                            <MainRenderer<TE, TS> item={v} key={i} />
                        ))}
                    </Renderer>
                </div>
            );
        }

        if (isFieldElement(element)) {
            const key = element.key.startsWith("$absolute:")
                ? element.key.split(":", 2)[1]
                : context.root
                ? context.root + "." + element.key
                : element.key;
            return (
                <div
                    className={`fieldcore-element-wrapper field pack-${element.pack} type-${element.subtype}`}
                >
                    <Renderer
                        context={context}
                        {...parsedProps}
                        key={key}
                        value={get(context.data, key) ?? null}
                        onChange={(value: any) => context.setData(key, value)}
                    />
                </div>
            );
        }

        return (
            <div
                className={`fieldcore-element-wrapper base pack-${element.pack} type-${element.subtype}`}
            >
                <Renderer context={context} {...parsedProps} />
            </div>
        );
    } else {
        return <></>;
    }
}

export function SourceRenderer<TE, TS>({
    source,
}: {
    source: BaseSource<TE, TS>;
}) {
    const context = useContext(FieldCoreContext);
    const _source = context.packs[source.pack]?.sources[source.subtype] ?? null;
    const Source: typeof _source | null = _source as typeof _source | null;
    const data = useDataType(source.data);
    if (Source) {
        return Source(context, source, data).map((v, i) => (
            <FieldCoreContext.Provider
                value={{
                    ...context,
                    root:
                        (context.root
                            ? context.root + "." + source.root
                            : source.root) +
                        "." +
                        i.toString(),
                }}
            >
                <MainRenderer<TE, TS> item={v} key={i} />
            </FieldCoreContext.Provider>
        ));
    } else {
        return <></>;
    }
}

export function MainRenderer<TE, TS>({ item }: { item: Renderable<TE, TS> }) {
    if (isSource(item)) {
        return <SourceRenderer<TE, TS> source={item} />;
    } else {
        return <ElementRenderer<TE, TS> element={item} />;
    }
}

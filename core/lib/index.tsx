import { omit, set } from "lodash";
import { Renderable } from "./components/Renderer";
import { FieldCoreContext, FieldPack } from "./types/context";
import {
    DataType,
    DataTypeArray,
    DataTypeLiteral,
    DataTypePath,
    DataTypeProcessor,
    isArrayDataType,
    isDataType,
    isLiteralDataType,
    isPathDataType,
    isProcessorDataType,
} from "./types/data";
import { FieldCoreContextType } from "./types/context";
import { BaseSource, isSource } from "./types/sourceBase";
import { BaseProcessor, isProcessor } from "./types/processorBase";
import {
    BaseElement,
    BaseContainerElement,
    BaseFieldElement,
    isElement,
    isContainerElement,
    isFieldElement,
} from "./types/elementBase";
import { useDataType, useDataTypes, parseData } from "./hooks/data";
import { parseProcessor } from "./hooks/processor";

export function FieldCore<TData extends object = object>({
    packs,
    document,
    value,
    onChange,
    ...props
}: {
    packs: { [key: string]: FieldPack };
    document: Renderable;
    value: TData;
    onChange: (value: TData) => void;
} & Partial<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
>) {
    return (
        <div
            className={
                "field-core root" +
                (props.className ? " " + props.className : "")
            }
            {...omit(props, "className")}
        >
            <FieldCoreContext.Provider
                value={{
                    data: value,
                    packs,
                    setData: (path, data) => onChange(set(value, path, data)),
                    root: null,
                }}
            ></FieldCoreContext.Provider>
        </div>
    );
}

export type {
    FieldPack,
    DataType,
    DataTypeArray,
    DataTypeLiteral,
    DataTypePath,
    DataTypeProcessor,
    FieldCoreContextType,
    BaseSource,
    BaseProcessor,
    BaseElement,
    BaseContainerElement,
    BaseFieldElement,
};
export {
    isArrayDataType,
    isContainerElement,
    isDataType,
    isElement,
    isFieldElement,
    isLiteralDataType,
    isPathDataType,
    isProcessor,
    isProcessorDataType,
    isSource,
};
export { useDataType, useDataTypes };
export { parseData, parseProcessor };

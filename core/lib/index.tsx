import { cloneDeep, omit, set } from "lodash";
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
    ElementProps,
} from "./types/elementBase";
import { useDataType, useDataTypes, parseData } from "./hooks/data";
import { parseProcessor } from "./hooks/processor";
import { MainRenderer } from "./components/Renderer";

export function FieldCore<
    TData extends object = object,
    TElementTypes extends BaseElement<any, any, any> = BaseElement<
        any,
        any,
        any
    >,
    TSourceTypes extends BaseSource<any, any, any> = BaseSource<any, any, any>,
    TProcessorTypes extends BaseProcessor<any> = BaseProcessor<any>
>({
    packs,
    document,
    value,
    onChange,
    ...props
}: {
    packs: {
        [key: string]: FieldPack<TElementTypes, TSourceTypes, TProcessorTypes>;
    };
    document: TElementTypes | TSourceTypes;
    value: TData;
    onChange: (value: TData) => void;
} & Partial<
    Omit<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        "onChange" | "value"
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
                    setData: (path, data) =>
                        onChange(set(cloneDeep(value), path, data)),
                    root: null,
                }}
            >
                <MainRenderer item={document} />
            </FieldCoreContext.Provider>
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
    ElementProps,
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

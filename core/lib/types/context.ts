import { ReactNode, createContext } from "react";
import { BaseElement } from "./elementBase";
import { BaseSource } from "./sourceBase";
import { DataType } from "./data";

export type FieldPack = {
    elements: {
        [key: string]: <T extends BaseElement = BaseElement>({
            context,
            type,
            subtype,
            pack,
            ...props
        }: { context: FieldCoreContextType } & T) => ReactNode;
    };
    sources: {
        [key: string]: <
            T extends BaseSource = BaseSource,
            TData extends DataType = DataType
        >(
            context: FieldCoreContextType,
            source: T,
            data: TData
        ) => BaseElement[];
    };
    processors: {
        [key: string]: <TOptions extends object = object, TReturn = any>(
            options: TOptions
        ) => TReturn;
    };
};

export type FieldCoreContextType<TData extends object = object> = {
    data: TData;
    document: BaseElement | null;
    packs: { [key: string]: FieldPack };
};

export const FieldCoreContext = createContext<FieldCoreContextType>({
    data: {},
    document: null,
    packs: {},
});

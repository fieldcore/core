import { ReactNode, createContext } from "react";
import { BaseElement } from "./elementBase";
import { BaseSource } from "./sourceBase";
import { DataType } from "./data";

export type FieldPack = {
    elements: {
        [key: string]: <T extends BaseElement = BaseElement>({
            context,
            ...props
        }: { context: FieldCoreContextType } & Partial<T> &
            Partial<{
                children: ReactNode[];
                key: string;
                value: any;
                onChange: (value: any) => void;
            }>) => ReactNode;
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
    packs: { [key: string]: FieldPack };
    root: string | null;
    setData: (path: string, data: any) => void;
};

export const FieldCoreContext = createContext<FieldCoreContextType>({
    data: {},
    packs: {},
    root: null,
    setData: () => {},
});

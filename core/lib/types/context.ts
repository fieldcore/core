import { ReactNode, createContext } from "react";
import { BaseElement } from "./elementBase";
import { BaseSource } from "./sourceBase";
import { DataType } from "./data";

export type FieldPack<TE, TS> = {
    elements: {
        [key: string]: <T extends TE = any>({
            context,
            ...props
        }: { context: FieldCoreContextType<TE, TS> } & Partial<T> &
            Partial<{
                children: ReactNode[];
                key: string;
                value: any;
                onChange: (value: any) => void;
            }> &
            any) => ReactNode;
    };
    sources: {
        [key: string]: <
            T extends BaseSource<TE, TS> = BaseSource<TE, TS>,
            TData extends DataType = DataType
        >(
            context: FieldCoreContextType<TE, TS>,
            source: T,
            data: TData
        ) => BaseElement<TE, TS>[];
    };
    processors: {
        [key: string]: <TOptions extends object = object, TReturn = any>(
            options: TOptions
        ) => TReturn;
    };
};

export type FieldCoreContextType<TE, TS, TData extends object = object> = {
    data: TData;
    packs: { [key: string]: FieldPack<TE, TS> };
    root: string | null;
    setData: (path: string, data: any) => void;
};

export const FieldCoreContext = createContext<FieldCoreContextType<any, any>>({
    data: {},
    packs: {},
    root: null,
    setData: () => {},
});

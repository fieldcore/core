import { ReactNode, createContext } from "react";
import { BaseSource } from "./sourceBase";
import { BaseProcessor } from "./processorBase";

export type FieldPack<TE, TS, TP extends BaseProcessor<any>> = {
    elements: {
        [key: string]: <T extends TE = any>({
            context,
            ...props
        }: { context: FieldCoreContextType<TE, TS, TP> } & Partial<T> &
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
            T extends BaseSource<TE, TS, TP> = BaseSource<TE, TS, TP>,
            TData = any
        >(
            context: FieldCoreContextType<TE, TS, TP>,
            source: T,
            data: TData
        ) => any[];
    };
    processors: {
        [key: string]: <TOptions extends object = object, TReturn = any>(
            options: TOptions
        ) => TReturn;
    };
};

export type FieldCoreContextType<
    TE,
    TS,
    TP extends BaseProcessor<any>,
    TData extends object = object
> = {
    data: TData;
    sourcedData?: any;
    packs: { [key: string]: FieldPack<TE, TS, TP> };
    root: string | null;
    setData: (path: string, data: any) => void;
};

export const FieldCoreContext = createContext<
    FieldCoreContextType<any, any, any>
>({
    data: {},
    packs: {},
    root: null,
    setData: () => {},
});

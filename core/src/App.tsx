import { useState } from "react";
import { FieldCore } from "../lib";
import { BasePack } from "./pack";
import { GroupElement, TextElement, FieldElement } from "./pack/elements/types";
import { StringSource } from "./pack/sources";
import { CapitalizeProcessor } from "./pack/processors";

function App() {
    const [data, setData] = useState({ test: "eee" });
    console.log(data);
    return (
        <FieldCore<
            any,
            GroupElement | TextElement | FieldElement,
            StringSource,
            CapitalizeProcessor
        >
            packs={{ test: BasePack }}
            document={{
                type: "element",
                pack: "test",
                subtype: "group",
                children: [
                    {
                        pack: "test",
                        type: "element",
                        subtype: "field",
                        key: "test",
                    },
                    {
                        pack: "test",
                        type: "source",
                        subtype: "string",
                        renderer: {
                            type: "element",
                            pack: "test",
                            subtype: "group",
                            children: [
                                {
                                    pack: "test",
                                    type: "element",
                                    subtype: "field",
                                    key: "test",
                                },
                                {
                                    type: "element",
                                    pack: "test",
                                    subtype: "text",
                                    content: {
                                        type: "data",
                                        subtype: "processor",
                                        processor: {
                                            pack: "test",
                                            type: "processor",
                                            subtype: "caps",
                                        },
                                        options: {
                                            input: {
                                                type: "data",
                                                subtype: "path",
                                                relative: true,
                                                path: "test",
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        root: "testroot",
                        data: {
                            type: "data",
                            subtype: "path",
                            path: "test",
                        },
                    },
                ],
            }}
            value={data}
            onChange={setData}
        />
    );
}

export default App;

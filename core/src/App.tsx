import { useState } from "react";
import { FieldCore } from "../lib";
import { BasePack } from "./pack";
import { GroupElement, TextElement, FieldElement } from "./pack/elements/types";

function App() {
    const [data, setData] = useState({ test: "eee" });
    return (
        <FieldCore<any, GroupElement | TextElement | FieldElement>
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
                        type: "element",
                        subtype: "text",
                        content: {
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

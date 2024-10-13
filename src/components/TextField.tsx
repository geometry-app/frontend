import React, { ReactNode, useState } from "react";
import constants from "../constants";

interface ITextFieldProps {
    hint?: ReactNode,
    children?: string,
    onChange?: (value: string) => void,
    filter?: (value: string) => boolean
    apply?: (value: string) => void
}

const TextField: React.FC<ITextFieldProps> = p => {
    const [state, setState] = useState(p.children ?? "");
    let input: HTMLInputElement | null;
    return <div className={`shadowed transitioned rounded hlop ec inputCursor ${p.filter && !p.filter(state) ? "border-red" : "border"}`} onClick={() => input?.focus()}>
        { p.hint && <p className="hint" style={{ color: constants.colors.almostBlack }}>{p.hint}</p> }
        <div style={{margin: "6px 4px"}}>
            <input
                type="text"
                ref={x => input = x}
                value={state}
                onChange={event => {
                    if (p.onChange)
                        p.onChange(event.target.value)
                    setState(event.target.value)
                }}
                onKeyDown={e => {
                    if (p.filter && !p.filter(state))
                        return;
                    p.apply && e.key === 'Enter' && p.apply(state)
                }}></input>
        </div>
    </div>;
}

export {
    TextField
}

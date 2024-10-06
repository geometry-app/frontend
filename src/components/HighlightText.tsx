import React from "react";
import { HighlightedString } from "../services/models";

interface IHighlightedTextProps {
    text?: HighlightedString
}

const HighlightText: React.FC<IHighlightedTextProps> = ({ text }) => {
    if (!text)
        return <></>
    return <>{text.items.map((x, i) => <span key={i}>{x.highlighted && <b>{x.value}</b>}{!x.highlighted && x.value}</span>)}</>
}

function toDefaultText(text?: HighlightedString): string {
    if (!text)
        return "";
    return text.items.map(x => x.value).join("");
}

export {
    HighlightText,
    toDefaultText
}

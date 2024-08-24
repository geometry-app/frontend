import React from "react";
import '../css/Text.css';
import { Action } from "../dotNetFeatures";
import { ReactComponent as CopySvg } from '../svgs/copy.svg';

interface ITextProps {
    style?: TextStyle,
    textToCopy?: string,
    onCopy?: Action<any>,
    children: React.ReactNode
}

enum TextStyle {
    Default,
    BoldDefault,
    MainHeader,
    Additional
}

const Text: React.FC<ITextProps> = p => {
    const renderer = {
        [TextStyle.Default]: (copy?: boolean) => <p>{p.children} {copy ? <CopySvg width={14} height={14} /> : <></>}</p>,
        [TextStyle.MainHeader]: (copy?: boolean) => <h1>{p.children} {copy ? <CopySvg width={14} height={14} /> : <></>}</h1>,
        [TextStyle.Additional]: (copy?: boolean) => <p style={{fontSize: "15px", color: "#333", fontWeight: 300}}>{p.children} {copy ? <CopySvg width={14} height={14} /> : <></>}</p>,
        [TextStyle.BoldDefault]: (copy?: boolean) => <p className="booold" style={{marginBottom: "8px"}}>{p.children} {copy ? <CopySvg width={14} height={14} /> : <></>}</p>,
    }
    function copy() {
        navigator.clipboard.writeText(p.textToCopy!);
        if (p.onCopy)
            p.onCopy(null);
    }


    // if (p.textToCopy) {
    //     return <span style={{cursor: "pointer"}} onClick={copy}>
    //         {renderer[p.style || TextStyle.Default]("rgb(58, 183, 255)")} {<CopySvg width={14} height={14}></CopySvg>}
    //     </span>
    // }
    if (p.textToCopy) {
        return <p style={{display: "table-cell", cursor: "pointer", color: "rgb(58, 183, 255)"}} className="hoverable animated-fast" onClick={copy}>
            <span className="booold">{p.children}</span><span style={{marginLeft: "5px"}}>{<CopySvg width={14} height={14} />}</span>
        </p>
    }
    return renderer[p.style || TextStyle.Default]();
}

export default Text;
export {
    Text,
    TextStyle
}

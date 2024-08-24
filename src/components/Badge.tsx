import React from "react";
import { Badge } from "../server/Contracts";
import { ReactComponent as LinkSvg } from '../svgs/link.svg';
import '../css/Badge.css';

interface IBadgeProp {
    badge: Badge
}

const BadgeComponent: React.FC<IBadgeProp> = p => {
    function goto()
    {
        if (p.badge.link)
            window.open(p.badge.link);
    }

    const css: React.CSSProperties = {
        marginRight: "8px",
        borderRadius: "6px",
        background: "#111",
        color: "#fff",
        paddingLeft: "12px",
        paddingRight: "12px",
        paddingTop: "4px",
        paddingBottom: "6px",
        verticalAlign: "middle",
    };

    if (p.badge.link)
        css.cursor = "pointer";

    return <div onClick={e => goto()} style={css} className="hoverable-badge animated-fast">
        <span>{p.badge.text}</span>{p.badge.link && <span style={{marginLeft: "8px"}}><LinkSvg style={{verticalAlign: "middle"}} stroke="#fff" width={18} height={18}></LinkSvg></span>}
    </div>;
}

export default BadgeComponent;
export {
    BadgeComponent
}

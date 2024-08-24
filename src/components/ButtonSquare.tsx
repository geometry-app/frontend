import React, { MouseEventHandler } from 'react';
import Constants from '../Constants';

export enum ButtonSquareStyle {
    Default,
    Simple
}

export interface IButtonSquareProps {
    text?: string,
    onClick?: MouseEventHandler<HTMLElement>,
    icon: React.ReactNode,
    centered?: boolean,
    style?: ButtonSquareStyle
}

export const ButtonSquare: React.FC<IButtonSquareProps> = p => {
    const style = p.style ?? ButtonSquareStyle.Default;
    if (style == ButtonSquareStyle.Simple) {
        return <div
            className={`center shadowed transitioned rounded ec`}
            style={{ cursor: "pointer", background: "#fff", width: "52px", height: "52px" }}
            onClick={(e) => {
                if (p.onClick)
                    p.onClick(e)}
            }
        >
            <div style={{marginTop: "6px"}}>
                {p.icon}
            </div>
            {p.text && <div className="buttonText" style={{ cursor: "pointer" }}>{p.text}</div>}
        </div>;
    }
    return <div
            className={`button center shadowed transitioned rounded ec`}
            style={{ minHeight: "42px", cursor: "pointer", width: "180px", background: "#fff", paddingTop: "20px", paddingBottom: "20px" }}
            onClick={(e) => {
                if (p.onClick)
                    p.onClick(e)}
            }
        >
            <div style={{ marginBottom: "8px" }}>
                {p.icon}
            </div>
            {p.text && <div className="buttonText" style={{ cursor: "pointer" }}>{p.text}</div>}
        </div>;
}

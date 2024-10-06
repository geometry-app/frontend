import React, { MouseEventHandler } from 'react';
import constants from '../constants';

enum ButtonStyle {
    White,
    Positive,
    Danger,
}

interface ButtonProps {
    text: string,
    style?: ButtonStyle,
    onClick?: MouseEventHandler<HTMLElement>,
    centered?: boolean,
    width?: number
}

const styles = {
    [ButtonStyle.White]: {
        back: {
            backgroundColor: '#FFF'
        },
        front: {
            color: constants.colors.almostBlack
        }
    },
    [ButtonStyle.Danger]: {
        back: {
            backgroundColor: constants.colors.negative
        },
        front: {
            color: constants.colors.almostWhite
        }
    },
    [ButtonStyle.Positive]: {
        back: {
            backgroundColor: constants.colors.positive
        },
        front: {
            color: constants.colors.almostWhite
        }
    }
}

const Button: React.FC<ButtonProps> = p => {
    return <div
            className={`button ${p.centered && 'center'} shadowed transitioned rounded ec`}
            style={{...styles[p.style || ButtonStyle.White].back, cursor: "pointer", display: "flex", width: `${p.width ? `${p.width}px` : "auto"}`}}
            onClick={p.onClick}>
        <span className="buttonText" style={{...styles[p.style || ButtonStyle.White].front, cursor: "pointer"}}>{p.text}</span>
    </div>;
}

export {
    Button,
    ButtonStyle
}
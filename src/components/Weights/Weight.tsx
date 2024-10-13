import React from 'react';

export interface IWeightProps {
    value: number,
    color: string,
    icon: string
}

export default function Weight(p: IWeightProps) {
    return <div style={{minWidth: "2em", borderRadius: "0em", height: "1.5em", background: p.color, textAlign: "center" }}>
        <img src={p.icon} width="18em" />
    </div>
}

import React, {useState} from "react";
import { Slider } from "../Slider";
import Text, { TextStyle } from "../Text/Text";

export interface IRouletteSliderProps {
    icon: string,
    init?: number | undefined,
    onChange?: (value: number) => void
}

export const RouletteSlider: React.FC<IRouletteSliderProps> = (p) => {
    return <div style={{display: "grid", gridTemplateColumns: "50px auto 50px", gap: "20px", alignItems: "center"}}>
        <img src={p.icon} width={50}/>
        <Slider disabled={p.init == undefined} init={p.init ?? 0} min={0} max={1} step={0.01} onChange={e => {
            if (p.onChange)
                p.onChange(e);
        }}/>
        <Text style={TextStyle.Default}>{p.init ?? 0}</Text>
    </div>
}

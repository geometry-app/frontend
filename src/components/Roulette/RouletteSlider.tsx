import React, {useState} from "react";
import {Slider} from "../Slider.tsx";
import Text, {TextStyle} from "../Text.tsx";
import {Action} from "../../dotNetFeatures.tsx";

export interface IRouletteSliderProps {
    icon: string,
    init: number,
    onChange?: Action<number>
}

export const RouletteSlider: React.FC<IRouletteSliderProps> = (p) => {
    const [value, setValue] = useState(p.init);
    return <div style={{display: "grid", gridTemplateColumns: "50px auto 50px", gap: "20px", alignItems: "center"}}>
        <img src={p.icon} width={50}/>
        <Slider init={value} min={0} max={1} step={0.01} onChange={e => {
            setValue(e);
            if (p.onChange)
                p.onChange(e);
        }}/>
        <Text style={TextStyle.Default}>{value}</Text>
    </div>
}

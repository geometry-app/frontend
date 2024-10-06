import React, {useState} from "react";
import { Slider } from "../Slider";
import Text, { TextStyle } from "../Text/Text";

export interface IRouletteSliderProps {
    icon: string,
    init: number,
    onChange?: (value: number) => void
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

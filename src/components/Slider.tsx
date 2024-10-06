import React, {useState} from "react";

export interface ISliderProps {
    init: number,
    min: number,
    max: number,
    step: number,
    onChange?: (value: number) => void
}

export const Slider: React.FC<ISliderProps> = p => {
    const [value, setValue] = useState(p.init);
    return <div>
        <input type={"range"} min={p.min.toString()} max={p.max.toString()} step={p.step.toString()} value={value} onChange={e => {
            setValue(Number(e.target.value));
            if (p.onChange)
                p.onChange(Number(e.target.value))
        }}/>
    </div>
}

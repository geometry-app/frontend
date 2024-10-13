import React, {useState} from "react";

export interface ISliderProps {
    init: number,
    min: number,
    max: number,
    step: number,
    disabled?: boolean | false,
    onChange?: (value: number) => void
}

export const Slider: React.FC<ISliderProps> = p => {
    return <div>
        <input disabled={p.disabled} type={"range"} min={p.min.toString()} max={p.max.toString()} step={p.step.toString()} value={p.init} onChange={e => {
            if (p.onChange)
                p.onChange(Number(e.target.value))
        }}/>
    </div>
}

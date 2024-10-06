import React from 'react'
import { IHaveChild } from '../common/IHaveChild';

export enum PlateStyle {
    Default,
    Simple
}

export interface IPlateProps extends IHaveChild {
    style?: PlateStyle,
    center?: boolean
}

export const Plate: React.FC<IPlateProps> = p => {
    const style = p.style ?? PlateStyle.Default;
    if (style == PlateStyle.Default) {
        return <div style={{marginTop: "12px", padding: "18px"}} className='plate rounded animated border-default'>
            {p.children}
        </div>
    }
    return <div style={{marginTop: "12px", padding: "18px", textAlign: "center"}}>
        {p.children}
    </div>
}

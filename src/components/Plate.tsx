import React from 'react'
import { DefaultProp } from '../Utils/DefaultProp'

export enum PlateStyle {
    Default,
    Simple
}

export interface IPlateProps {
    children: React.ReactNode,
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
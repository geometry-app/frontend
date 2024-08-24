import React from 'react';
import {IRoulettePreview} from '../../server/Contracts.tsx';
import {Plate} from '../Plate.tsx';
import {useRoulette} from '../../contexts/RouletteContext.tsx';
import Text, {TextStyle} from "../Text.tsx";
import {ReactComponent as CrownSvg} from '../../svgs/crown.svg';
import {ReactComponent as GlobalSvg} from '../../svgs/global.svg';

interface IRouletteItemProps {
    roulette: IRoulettePreview
}

export const RouletteItem: React.FC<IRouletteItemProps> = (p) => {
    const roulette = useRoulette();
    let gridTemplate = "auto";
    if (p.roulette.isPublic)
        gridTemplate = `24px ${gridTemplate}`;
    if (p.roulette.owner)
        gridTemplate = `24px ${gridTemplate}`;
    return <div style={{cursor: "pointer"}} onClick={e => roulette.open(p.roulette.id)}>
        <Plate>
            <div style={{display: "grid", gridTemplateColumns: gridTemplate, gap: "8px", alignItems: "center"}}>
                {p.roulette.owner && <CrownSvg width={24} height={24}/>}
                {p.roulette.isPublic && <GlobalSvg width={24} height={24} stroke="#000"/>}
                <Text style={TextStyle.MainHeader}>{p.roulette.name ?? "unnamed"}</Text>
            </div>

            <div className={"ec"}>
                <Text style={TextStyle.Additional}>{p.roulette.type === "challenge" ? "Challenge" : "Normal"}</Text>
            </div>
            <Text style={TextStyle.Additional}>{new Date(p.roulette.createDt).toLocaleString()}</Text>
        </Plate>
    </div>
}

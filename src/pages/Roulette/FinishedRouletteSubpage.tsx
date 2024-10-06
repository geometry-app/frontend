import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoulette } from "../../context/RouletteContext";
import { Plate, PlateStyle } from "../../components/Plate";
import Text, { TextStyle } from "../../components/Text/Text";
import { Button } from "../../components/Button";
import { CopyRouletteComponent } from "../../components/Roulette/CopyRouletteComponent";
import Level from "../../components/Level";

export interface IFinishRouletteProps {

}

export const FinishRouletteSubpage: React.FC<IFinishRouletteProps> = (p) => {
    const navigate = useNavigate();
    const roulette = useRoulette();

    let index = 0;
    for (let i = 0; i < 100; i++) {
        if (!roulette.getProgress(i, false)) {
            index = i;
            break;
        }
    }

    return <div>
        <Plate style={PlateStyle.Simple} center={true}>
            <Text style={TextStyle.MainHeader}>Congratulations!</Text>
            <Text style={TextStyle.Default}>You won</Text>
        </Plate>
        <Plate style={PlateStyle.Simple} center={true}>
            <Text style={TextStyle.Additional}>Here are shown your steps and upcoming demons.</Text>
        </Plate>
        <Plate style={PlateStyle.Simple}>
            <div style={{display: "grid", gridTemplateColumns: "250px 250px", justifyContent: "center", gap: "20px"}}>
                <Button text={"Take Me Home"} centered={true} onClick={e => navigate('/')}/>
                <CopyRouletteComponent />
            </div>
        </Plate>
        {roulette.getRoulette().levels.map((x, i) => {
            const filter: string | undefined = roulette.getProgress(i, false) ? undefined : "grayscale(0.9)";
            const level = (<div style={{filter: filter}}>
                <Level level={x.levels[0]} percent={roulette.getProgress(i, false)?.progress}/>
            </div>)
            if (i == index && index != 0)
                return <>
                    <Plate style={PlateStyle.Simple}>
                        <Text style={TextStyle.Additional}>The demons that you were supposed to encounter next</Text>
                    </Plate>
                    {level}
                </>
            return level;
        })}
    </div>
}

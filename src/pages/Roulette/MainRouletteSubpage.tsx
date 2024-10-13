import React, {CSSProperties, useEffect, useState} from 'react';
import { useRoulette } from '../../context/RouletteContext';
import { useNavigate } from 'react-router-dom';
import { get } from '../../server/Backbone';
import { Plate, PlateStyle } from '../../components/Plate';
import Text, { TextStyle } from '../../components/Text/Text';
import { RouletteItem } from '../../components/Roulette/RouletteItem';
import { Button, ButtonStyle } from '../../components/Button';
import { IRoulettePreview } from '../../services/roulette/models';

interface IMainRouletteSubpageProps {

}

export const MainRouletteSubpage: React.FC<IMainRouletteSubpageProps> = () => {
    const [roulettes, setRoulettes] = useState<IRoulettePreview[]>([]);
    const roulette = useRoulette();
    const navigate = useNavigate();

    useEffect(() => {
        get<IRoulettePreview[]>("roulette/sessions", {
            'sessionId': `${localStorage.getItem("roulette/sessionId")}`
        })
            .then(x => {
                if (!x)
                    return;
                x.sort((a, b) => a.createDt > b.createDt ? -1 : 1);
                setRoulettes(x);
            });
    }, []);

    const left: CSSProperties = {
        textAlign: "left"
    }
    const right: CSSProperties = {
        textAlign: "right"
    }

    return <Plate style={PlateStyle.Simple}>
        <Text style={TextStyle.MainHeader}>Geometry Dash Roulette</Text>
        <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Additional}>In this mini-game you will be presented with a list of 100 randomly generated levels. Your goal is to complete each level, one by one, increasing the completed percentage by 1. The levels are of varying difficulty, and you'll need to eat each one in order to advance to the next. Good luck!</Text>
        </Plate>
        <Plate style={PlateStyle.Simple}>
            <div style={{display: "grid", "gridTemplateColumns": "auto auto", alignItems: "center", gap: "20px", justifyContent: "center"}}>
            </div>
        </Plate>
        <img src={`/images/fire_wheel.png`} width="30%" style={{marginLeft: "20%", marginRight: "20%"}}></img>
        <Button text='Take Me Home' centered={true} onClick={e => navigate("/")}></Button>
        <Button text='Create a new roulette' style={ButtonStyle.Positive} centered={true} onClick={e => roulette.start()}></Button>
        <div style={{textAlign: "start"}}>
            {roulettes && roulettes.map(x => <RouletteItem roulette={x} />)}
        </div>
    </Plate>
}

import React from "react";
import {Plate, PlateStyle} from "../../components/Plate.tsx";
import Text, {TextStyle} from "../../components/Text.tsx";
import {Button, ButtonStyle} from "../../components/Button.tsx";
import {RouletteState, useRoulette} from "../../contexts/RouletteContext.tsx";

export const PrepareToStartSubpage: React.FC = () => {
    const roulette = useRoulette();

    return <Plate style={PlateStyle.Simple}>
        <Text style={TextStyle.MainHeader}>Roulette Not Yours</Text>
        <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Additional}>Wanna add a roulette to your collection?</Text>
        </Plate>
        <Plate style={PlateStyle.Simple}>
            <Button text={"Let's Play!"} style={ButtonStyle.Positive} centered={true} onClick={e => roulette.addRouletteToMe()}/>
        </Plate>
    </Plate>
}
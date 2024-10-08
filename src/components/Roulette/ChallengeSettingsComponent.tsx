import React, {useEffect, useState} from "react";
import { IDemonWeights } from "../../services/roulette/models";
import { get } from "../../server/Backbone";
import { Plate, PlateStyle } from "../Plate";
import Text, { TextStyle } from "../Text/Text";
import { RouletteSlider } from "./RouletteSlider";

interface IRouletteBalanceResponse {
    weights: IDemonWeights
}

export interface IRouletteBalanceProps {
    onChange: (value: IDemonWeights) => void
}

export const ChallengeSettingsComponent: React.FC<IRouletteBalanceProps> = p => {
    const [weights, setWeights] = useState<IDemonWeights>();

    useEffect(() => {
        get<IRouletteBalanceResponse>("roulette/balance").then(result => {
            if (result?.weights)
                setWeights(result.weights);
        }).catch(e => console.log("error while fetching roulette balance"));
    }, []);

    useEffect(() => {
        if (weights)
            p.onChange(weights);
    }, [weights])

    return <Plate style={PlateStyle.Simple}>
        {weights && <div>
            <Text style={TextStyle.Default}>Use the sliders below to adjust the likelihood of encountering different
                types of demons</Text>
            <RouletteSlider init={weights.easyDemon} icon={`/images/difficulty_demon_easy.png`}
                            onChange={e => setWeights(prev => ({...prev!, easyDemon: e}))}/>
            <RouletteSlider init={weights.mediumDemon} icon={`/images/difficulty_demon_normal.png`}
                            onChange={e => setWeights(prev => ({...prev!, mediumDemon: e}))}/>
            <RouletteSlider init={weights.hardDemon} icon={`/images/difficulty_demon_hard.png`}
                            onChange={e => setWeights(prev => ({...prev!, hardDemon: e}))}/>
            <RouletteSlider init={weights.insaneDemon} icon={`/images/difficulty_demon_harder.png`}
                            onChange={e => setWeights(prev => ({...prev!, insaneDemon: e}))}/>
            <RouletteSlider init={weights.extremeDemon} icon={`/images/difficulty_demon_insane.png`}
                            onChange={e => setWeights(prev => ({...prev!, extremeDemon: e}))}/>
        </div>}
        {!weights && <Text style={TextStyle.Additional}>Loading...</Text>}
    </Plate>
}

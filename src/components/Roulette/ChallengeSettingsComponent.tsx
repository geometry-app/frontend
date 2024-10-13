import React, { useEffect, useState } from "react";
import { get } from "../../server/Backbone";
import { Plate, PlateStyle } from "../Plate";
import Text, { TextStyle } from "../Text/Text";
import { RouletteSlider } from "./RouletteSlider";
import { IBalance, IRouletteLevelWeights } from "../../context/RouletteContext";
import { QueryRequest } from "../../services/search/models";
import { buildQuery } from "../../services/search/QueryBuilder";

export interface IRouletteBalanceProps {
    request: QueryRequest
    onChange: (value: IBalance) => void
}

export const ChallengeSettingsComponent: React.FC<IRouletteBalanceProps> = p => {
    const [balance, setBalance] = useState<IBalance>({total: 0, weights: {}});

    useEffect(() => {
        get<IBalance>("roulette/v2/balance?" + new URLSearchParams({ query: buildQuery(p.request) }))
            .then(result => {
                if (result)
                    setBalance(result);
                console.log("fetched", result);
            })
            .catch(e => console.log("error while fetching roulette balance"));
    }, [p.request]);

    useEffect(() => {
        if (balance)
            p.onChange(balance);
    }, [balance])

    function render(current: number | undefined, icon: string, update: (v: number, weight: IRouletteLevelWeights) => IRouletteLevelWeights) {
        const filter: string | undefined = current != undefined ? undefined : "grayscale(0.9)";
        return <div style={{filter}}>
            <RouletteSlider init={current} icon={icon} onChange={e => setBalance(prev => ({ ...prev!, weights: update(e, prev.weights) }))} />
        </div>
    }

    return <Plate style={PlateStyle.Simple}>
        {balance && <div>
            <Text style={TextStyle.Default}>Use the sliders below to adjust the likelihood of encountering different types of demons</Text>
            {render(balance.weights.auto, `/images/difficulty_auto.png`, (e, prev) => ({ ...prev, auto: e }))}
            {render(balance.weights.undef, `/images/difficulty_undefined.png`, (e, prev) => ({ ...prev!, undef: e }))}

            {render(balance.weights.easy, `/images/difficulty_easy.png`, (e, prev) => ({ ...prev!, easy: e }))}
            {render(balance.weights.normal, `/images/difficulty_normal.png`, (e, prev) => ({ ...prev!, normal: e }))}
            {render(balance.weights.hard, `/images/difficulty_hard.png`, (e, prev) => ({ ...prev!, hard: e }))}
            {render(balance.weights.harder, `/images/difficulty_harder.png`, (e, prev) => ({ ...prev!, harder: e }))}
            {render(balance.weights.insane, `/images/difficulty_insane.png`, (e, prev) => ({ ...prev!, insane: e }))}

            {render(balance.weights.easyDemon, `/images/difficulty_demon_easy.png`, (e, prev) => ({ ...prev!, easyDemon: e }))}
            {render(balance.weights.mediumDemon, `/images/difficulty_demon_normal.png`, (e, prev) => ({ ...prev!, mediumDemon: e }))}
            {render(balance.weights.hardDemon, `/images/difficulty_demon_hard.png`, (e, prev) => ({ ...prev!, hardDemon: e }))}
            {render(balance.weights.insaneDemon, `/images/difficulty_demon_harder.png`, (e, prev) => ({ ...prev!, insaneDemon: e }))}
            {render(balance.weights.extremeDemon, `/images/difficulty_demon_insane.png`, (e, prev) => ({ ...prev!, extremeDemon: e }))}
        </div>}
        {!balance && <Text style={TextStyle.Additional}>Loading...</Text>}
    </Plate>
}

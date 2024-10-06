import React from "react";
import { useRoulette } from "../../context/RouletteContext";
import { post } from "../../server/Backbone";
import { Button, ButtonStyle } from "../Button";

export interface ICopyRouletteProps {

}

interface IPublishRequest {
    rouletteId: string
}

interface IPublishResponse {
    isPublished: boolean
}

export const CopyRouletteComponent: React.FC<ICopyRouletteProps> = p => {
    const roulette = useRoulette();
    const sessionId = localStorage.getItem('roulette/sessionId');

    function publishRoulette() {
        post<IPublishResponse, IPublishRequest>("roulette/publish", {
            rouletteId: roulette!.getRoulette().rouletteId
        }, {
            sessionId: sessionId
        }).then(x => roulette.setPublished(roulette.getRoulette().rouletteId));
    }

    return <>
        {!roulette.getRoulette().isPublished && <Button text={"Make it Public"} centered={true} style={ButtonStyle.White} onClick={e => publishRoulette()}></Button>}
        {roulette.getRoulette().isPublished && <Button text={"Copy roulette link"} centered={true} style={ButtonStyle.Positive} onClick={e => navigator.clipboard.writeText(window.location.href)}></Button>}
    </>
}

import React from "react";
import { IRouletteLevelWeights } from "../../context/RouletteContext";
import Weight from "./Weight";

export interface IWeightsViewProps {
    weights: IRouletteLevelWeights
}

export default function WeightsView(p: IWeightsViewProps) {
    return <div style={{display: "grid", borderRadius: "10em", overflow: "hidden", gridTemplateColumns: `
    ${p.weights.undef != undefined ? `${p.weights.undef}fr` : ""}
    ${p.weights.auto != undefined ? `${p.weights.auto}fr` : ""}
    ${p.weights.easy != undefined ? `${p.weights.easy}fr` : ""}
    ${p.weights.normal != undefined ? `${p.weights.normal}fr` : ""}
    ${p.weights.hard != undefined ? `${p.weights.hard}fr` : ""}
    ${p.weights.harder != undefined ? `${p.weights.harder}fr` : ""}
    ${p.weights.insane != undefined ? `${p.weights.insane}fr` : ""}
    ${p.weights.easyDemon != undefined ? `${p.weights.easyDemon}fr` : ""}
    ${p.weights.mediumDemon != undefined ? `${p.weights.mediumDemon}fr` : ""}
    ${p.weights.hardDemon != undefined ? `${p.weights.hardDemon}fr` : ""}
    ${p.weights.insaneDemon != undefined ? `${p.weights.insaneDemon}fr` : ""}
    ${p.weights.extremeDemon != undefined ? `${p.weights.extremeDemon}fr` : ""}
    `}}>
        {p.weights.undef != undefined && <Weight value={p.weights.undef} color="rgb(215, 215, 215)" icon="/images/difficulty_undefined.png"/> }
        {p.weights.auto != undefined && <Weight value={p.weights.auto} color="rgb(255, 228, 176)" icon="/images/difficulty_auto.png"/> }

        {p.weights.easy != undefined && <Weight value={p.weights.easy} color="rgb(175, 218, 255)" icon="/images/difficulty_easy.png"/> }
        {p.weights.normal != undefined && <Weight value={p.weights.normal} color="rgb(176, 255, 147)" icon="/images/difficulty_normal.png"/> }
        {p.weights.hard != undefined && <Weight value={p.weights.hard} color="rgb(255, 208, 134)" icon="/images/difficulty_hard.png"/> }
        {p.weights.harder != undefined && <Weight value={p.weights.harder} color="rgb(255, 128, 128)" icon="/images/difficulty_harder.png"/> }
        {p.weights.insane != undefined && <Weight value={p.weights.insane} color="rgb(255, 160, 245)" icon="/images/difficulty_insane.png"/> }

        {p.weights.easyDemon != undefined && <Weight value={p.weights.easyDemon} color="rgb(229, 134, 255)" icon="/images/difficulty_demon_easy.png"/> }
        {p.weights.mediumDemon != undefined && <Weight value={p.weights.mediumDemon} color="rgb(255, 134, 202)" icon="/images/difficulty_demon_normal.png"/> }
        {p.weights.hardDemon != undefined && <Weight value={p.weights.hardDemon} color="rgb(255, 111, 138)" icon="/images/difficulty_demon_hard.png"/> }
        {p.weights.insaneDemon != undefined && <Weight value={p.weights.insaneDemon} color="rgb(217, 66, 66)" icon="/images/difficulty_demon_harder.png"/> }
        {p.weights.extremeDemon != undefined && <Weight value={p.weights.extremeDemon} color="rgb(115, 18, 18)" icon="/images/difficulty_demon_insane.png"/> }
    </div>
}

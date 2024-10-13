import { IRouletteLevelWeights } from "../../context/RouletteContext"
import { QueryRequest } from "../search/models"

export interface IRoulettePreview {
    id: string,
    name?: string,
    type: string,
    owner: boolean,
    isPublic: boolean,
    createDt: Date,
    request?: QueryRequest | null,
    weights?: IRouletteLevelWeights | null
}

export interface IDemonWeights {
    easyDemon: number,
    mediumDemon: number,
    hardDemon: number,
    insaneDemon: number,
    extremeDemon: number
}

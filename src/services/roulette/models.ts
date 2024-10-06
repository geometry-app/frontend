export interface IRoulettePreview {
    id: string,
    name?: string,
    type: string,
    owner: boolean,
    isPublic: boolean,
    createDt: Date
}

export interface IDemonWeights {
    easyDemon: number,
    mediumDemon: number,
    hardDemon: number,
    insaneDemon: number,
    extremeDemon: number
}

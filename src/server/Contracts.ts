export interface HighlightItem {
    value: string,
    highlighted: boolean
}

export interface HighlightedString {
    items: HighlightItem[]
}

export interface PreviewEntity {
    type: number
}

export interface SearchItemContract extends PreviewEntity {
    name: HighlightedString,
    id: number,
    description: HighlightedString,
    difficulty: number,
    demonDifficulty: number,
    difficultyIcon: number,
    isDemon: boolean,
    password?: string,
    server: string,
    badges?: Badge[],
    notFound: string[]
}

export interface Badge {
    text: string,
    link?: string
}

export interface SearchResult {
    timeSpend: number,
    total: number,
    items: SearchItemContract[]
}

export interface IRoulettePreview {
    id: string,
    name?: string,
    type: string,
    owner: boolean,
    isPublic: boolean,
    createDt: Date
}

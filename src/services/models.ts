// there is common types

export interface HighlightItem {
    value: string,
    highlighted: boolean
}

export interface HighlightedString {
    items: HighlightItem[]
}

export interface Badge {
    text: string,
    link?: string
}

export enum LengthType {
    Tiny = 0,
    Short = 1,
    Medium = 2,
    Long = 3,
    XL = 4,
    Platformer = 5
}

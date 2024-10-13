
// data about data

import { HighlightedString, LengthType } from "../models"

export const enum FilterType {
    Term,  // is, not
    Number // more than, less than, is, not
}

export interface IFilterDefinition {
    type: FilterType,
    name: string
}

export interface ISearchFilterResponse {
    filter: IFilterDefinition[]
}

// data

export enum FilterOperator
{
    Equals = 1 << 0,
    Less = 1 << 1,
    More = 1 << 2,
    Not = 1 << 3
}

export interface Filter {
    n: string,
    v: string,
    o: FilterOperator
}

export interface PartialFilter {
    n: string,
    o?: FilterOperator | undefined
    v?: string | undefined,
}

export interface QueryRequest {
    t?: string | undefined,
    f: Filter[]
}

// ordinary search

export interface SearchResult {
    timeSpend: number,
    total: number,
    items: SearchItem[]
}

export interface PreviewEntity {
    type: number
}

export interface Badge {
    text: string,
    link?: string
}

export interface SearchItem extends PreviewEntity {
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
    notFound: string[],
    likes: number,
    length: LengthType,
}

// autocomplete

export interface AutocompleteResult {
    base: string,
    additional: string[]
}

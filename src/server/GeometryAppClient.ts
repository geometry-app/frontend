import { SearchResult } from './Contracts';
import {get} from "../Backbone.tsx";

const Search = async (query: string, page: number, isLucky: boolean): Promise<SearchResult> => {
    let params = new URLSearchParams({query, page: page.toString(), "lucky": isLucky ? "1" : "0"});
    let result = await get<SearchResult>(`search?${params}`);
    if (result == null)
        console.error("error search request");
    return result!;
}

export {
    Search
}
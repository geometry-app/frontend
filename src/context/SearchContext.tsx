import React, { useContext, useState } from "react";
import { IHaveChild } from "../common/IHaveChild";
import { ISearchService, SearchService } from "../services/search/SearchService";

const SearchContext: React.Context<ISearchService> = React.createContext<ISearchService>(null!);

export function useSearch(): ISearchService {
    return useContext<ISearchService>(SearchContext);
}

export const SearchProvider: React.FC<IHaveChild> = (p) => {
    const [state, setState] = useState(new SearchService());

    return <SearchContext.Provider value={state}>
        {p.children}
    </SearchContext.Provider>
}

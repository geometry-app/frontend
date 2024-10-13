import { get } from "../../server/Backbone";
import { AutocompleteResult, FilterType, IFilterDefinition, ISearchFilterResponse, QueryRequest, SearchResult } from "./models";
import { buildQuery, parsePartialFilter } from "./QueryBuilder";

export interface ISearchService {
    search: (reqeust: QueryRequest, isLucky: boolean, page: number) => Promise<SearchResult | undefined>
    findFilters: () => Promise<IFilterDefinition[]>
    autocomplete: (input: string) => Promise<AutocompleteResult>
}

export class SearchService implements ISearchService {
    
    filters?: IFilterDefinition[];

    async search(request: QueryRequest, isLucky: boolean): Promise<SearchResult | undefined> {
        let query = `query=${buildQuery(request)}`;
        if (isLucky)
            query += "&isLucky=1";
        return await get<SearchResult>(`search?${query}`);
    }

    async findFilters(): Promise<IFilterDefinition[]> {
        if (this.filters)
            return Promise.resolve(this.filters);
        let result = await get<ISearchFilterResponse>("search/filters");
        if (result?.filter) {
            this.filters = result.filter;
            return Promise.resolve(this.filters);
        }
        return Promise.reject();
    }

    async autocomplete(input: string): Promise<AutocompleteResult> {
        let filters = this.filters;
        if (!filters)
            filters = await this.findFilters();
        if (!filters)
            return Promise.reject();

        const partial = parsePartialFilter(input);
        if (!partial) {
            const result = filters
                .filter(x => x.name.startsWith(input))
                .map(x => x.name.substring(input.length));
            return {
                base: input,
                additional: result
            };
        }
        if (partial.v === undefined) {
            const filter = filters.find(x => x.name == partial.n);
            const operator = input.substring(partial.n.length).trim();
            if (filter?.type == FilterType.Term)
                return { base: operator ?? "", additional: this.trimByEnd([ "is", "not" ], operator ?? "") }
            if (filter?.type == FilterType.Number)
                return { base: operator ?? "", additional: this.trimByEnd([ "is", "not", "more than", "less than" ], operator ?? "") }
            return Promise.reject();
        }

        let result = await get<AutocompleteResult>("search/completions?" + new URLSearchParams({
            filter: partial.n,
            query: partial.v
        }));
        return result ?? Promise.reject();
    }

    private trimByEnd(values: string[], trimBy: string): string[] {
        if (trimBy.length === 0)
            return values;
        return values.map(value => {
            for (let i = trimBy.length; i > 0; i--) {
                const suffix = trimBy.slice(trimBy.length - i);
                if (value.startsWith(suffix))
                    return value.slice(suffix.length);
            }

            return undefined;
        }).filter(x => x != undefined);
    }
}

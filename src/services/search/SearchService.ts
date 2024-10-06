import { get } from "../../server/Backbone";
import { IFilterDefinition, ISearchFilterResponse, QueryRequest, SearchResult } from "./models";
import { buildQuery } from "./QueryBuilder";

export interface ISearchService {
    search: (reqeust: QueryRequest, isLucky: boolean, page: number) => Promise<SearchResult | undefined>
    findFilters: () => Promise<IFilterDefinition[]>
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
}

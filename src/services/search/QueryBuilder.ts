import { Filter, FilterOperator, QueryRequest } from "./models";

const operationsNameMap = new Map<FilterOperator, string>();
operationsNameMap.set(FilterOperator.Equals, "is");
operationsNameMap.set(FilterOperator.More, "more than");
operationsNameMap.set(FilterOperator.Less, "less than");

export function buildQuery(request: QueryRequest): string {
    const json = JSON.stringify(request);
    const base64 = Buffer.from(json).toString('base64');
    return base64
}

export function toRaw(request: QueryRequest): string {
    let query = "";
    for (let filter of request.f) {
        if (query.length > 0)
            query += " ";
        query += `${filter.n} ${operationsNameMap.get(filter.o)} ${filter.v}`;
    }
    if (request.t)
    {
        if (query.length > 0)
            query += " ";
        query += ` ${request.t}`;
    }

    return query;
}

// heh: l dada > 2 kek lol

export function parseRawQuery(value?: string): QueryRequest {
    if (!value)
        return { f: [] };
    let regex: RegExp = /((\S+)\s*(is|more than|less than)\s*(\S+))/g;
    let matches = Array.from(value.matchAll(regex), m => m);
    let filters: Filter[] = matches.map(x => {

        let operator: FilterOperator = FilterOperator.Equals;
        if (x[3] == "is")
            operator = FilterOperator.Equals;
        if (x[3] == "more than")
            operator = FilterOperator.More;
        if (x[3] == "less than")
            operator = FilterOperator.Less;

        let filter: Filter = {
            n: x[2],
            o: operator,
            v: x[4]
        }
        return filter
    });
    const last = matches[matches.length - 1];
    if (!last)
        return { f: filters, t: value };
    const index = last.index + last[0].length;
    const text = index < value.length ? value.substring(index).trim() : undefined;
    console.log(matches);
    return { f: filters, t: text };
}

export function parseQuery(value: string | undefined): QueryRequest {
    if (value === undefined)
        return { f: [] };
    try {
        const base64 = Buffer.from(value, 'base64');
        const json = base64.toString();
        return JSON.parse(json);
    }
    catch {
        return { t: value, f: [] };
    }
}

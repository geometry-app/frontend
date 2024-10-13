import { Filter, FilterOperator, PartialFilter, QueryRequest } from "./models";

const filterRegex: RegExp = /((\S+)\s+(is|not|more than|less than)\s+(\S+)) {1}/g;
const partialFilterRegex: RegExp = /(\S+)\s+(?:(is|not|more than|less than)\s+(\S*))?/;
const operationsNameMap = new Map<FilterOperator, string>();
operationsNameMap.set(FilterOperator.Equals, "is");
operationsNameMap.set(FilterOperator.Equals | FilterOperator.Not, "not");
operationsNameMap.set(FilterOperator.More, "more than");
operationsNameMap.set(FilterOperator.Less, "less than");

function getOperator(value: string): FilterOperator {
    if (value == "is")
        return FilterOperator.Equals;
    if (value == "not")
        return FilterOperator.Equals | FilterOperator.Not;
    if (value == "more than")
        return FilterOperator.More;
    if (value == "less than")
        return FilterOperator.Less;
    return FilterOperator.Equals;
}

export function readable(operator: FilterOperator) {
    return operationsNameMap.get(operator);
}

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
        query += toRawFilter(filter);
    }
    if (request.t)
    {
        if (query.length > 0)
            query += " ";
        query += `${request.t}`;
    }

    return query;
}

export function toRawFilters(request: QueryRequest): string {
    let query = "";
    for (let filter of request.f) {
        if (query.length > 0)
            query += " ";
        query += toRawFilter(filter);
    }

    return query;
}

export function toRawFilter(filter: Filter): string {
    return `${filter.n} ${readable(filter.o)} ${filter.v}`;
}

export function parseRawQuery(value?: string): QueryRequest {
    if (!value)
        return { f: [] };
    let matches = Array.from(value.matchAll(filterRegex), m => m);
    let filters: Filter[] = matches.map(x => {
        return {
            n: x[2],
            o: getOperator(x[3]),
            v: x[4]
        };
    });
    const last = matches[matches.length - 1];
    if (!last)
        return { f: filters, t: value };
    const index = last.index + last[0].length;
    const text = index < value.length ? value.substring(index) : undefined;
    console.log(matches);
    return { f: filters, t: text };
}

export function parsePartialFilter(input: string): PartialFilter | undefined {
    const match = input.match(partialFilterRegex);
    if (!match)
        return undefined;
    return {
        n: match[1] ?? "",
        o: match[2] ? getOperator(match[2]) : undefined,
        v: match[3]
    }
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

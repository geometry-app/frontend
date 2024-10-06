import React, { useEffect, useState } from "react";
import { Action } from "../../common/DotNetFeatures";
import { IFilterDefinition, QueryRequest } from "../../services/search/models";
import { useSearch } from "../../context/SearchContext";
import { TextField } from "../TextField";
import { buildQuery, parseQuery, parseRawQuery, toRaw } from "../../services/search/QueryBuilder";

export interface IAdvanceInputParameters {
    prepend?: QueryRequest,
    submit: Action<QueryRequest>
}

// grammar: (type + operator + value)* text
// length: 10
// length > 10   ролововрвововоароар

export default function AdvanceInput(p: IAdvanceInputParameters) {
    const [filters, setFilters] = useState<IFilterDefinition[] | undefined>();
    const search = useSearch();
    const [state, setState] = useState(p.prepend ? toRaw(p.prepend) : "");

    useEffect(() => {
        search
            .findFilters()
            .then(x => setFilters(x))
            .catch(e => console.error("failed to fetch builtin filters", e));
    }, []);

    let input: HTMLInputElement | null;
    return <div className={`shadowed transitioned rounded hlop ec inputCursor border`} onClick={() => input?.focus()}>
        <div style={{margin: "6px 4px"}}>
            <input
                type="text"
                ref={x => input = x}
                value={state}
                onChange={event => {
                    setState(event.target.value)
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter')
                        p.submit(parseRawQuery(state));
                }}></input>
        </div>
        {/* {filters?.map(x => <p>{x.name}-{x.type}</p>)} */}
    </div>;
}

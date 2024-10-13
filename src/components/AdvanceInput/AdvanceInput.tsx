import React, { useEffect, useState } from "react";
import { AutocompleteResult, IFilterDefinition, QueryRequest } from "../../services/search/models";
import { useSearch } from "../../context/SearchContext";
import { parseRawQuery, readable, toRaw, toRawFilter, toRawFilters } from "../../services/search/QueryBuilder";
import './advanceInput.css';
import SelectableItem from "../SelectableItem/SelectableItem";
import FilterView from "./FilterView";

export interface IAdvanceInputParameters {
    prepend?: QueryRequest,
    submit: (value: QueryRequest) => void
    changed?: (value: QueryRequest) => void
}

export default function AdvanceInput(p: IAdvanceInputParameters) {
    const [completions, setCompletions] = useState<AutocompleteResult>();
    const [focused, setFocused] = useState<boolean>(false);
    const state = p.prepend ?? { f: [] }
    const search = useSearch();

    useEffect(() => {
        search
            .autocomplete(state.t ?? "")
            .then(x => setCompletions(x))
            .catch(e => {
                console.error("failed to fetch completions", e);
                setCompletions({ base: "", additional: [] });
            });
    }, [state]);

    function componentKeyProcess(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Escape") {
            setFocused(false);
        }
    }

    let input: HTMLInputElement | null = null;
    return <div style={{ position: "relative" }} onKeyDown={componentKeyProcess}>
        <div className={`shadowed transitioned rounded hlop ec inputCursor border`} onClick={() => input?.focus()}>
            <div style={{ margin: "6px 4px", display: "flex" }}>
                {state && state.f.map(x => <FilterView filter={x} />)}
                <span>
                    <input
                        type="text"
                        ref={x => input = x}
                        onFocus={x => setFocused(true)}
                        value={state?.t ? state.t : ""}
                        onChange={event => {
                            const rawFilters = state ? toRawFilters(state) : "";
                            const query = parseRawQuery((rawFilters ? `${rawFilters} ` : "") + event.target.value)
                            if (p.changed) {
                                p.changed(query)
                            }
                            if (!focused)
                                setFocused(true);
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter')
                            {
                                const rawFilters = state ? toRawFilters(state) : "";
                                const query = parseRawQuery((rawFilters ? `${rawFilters} ` : "") + (state.t ?? "") + (state.t?.lastIndexOf(" ") === state.t?.length ? " " : ""));
                                if (p.changed)
                                    p.changed(query);
                                p.submit(query);
                            }
                            if (e.key === 'Backspace' && (state.t?.length ?? 0) == 0 && state.f.length > 0) {
                                const filter = state.f.pop();
                                if (!filter || !p.changed)
                                    return;
                                p.changed({
                                    f: state.f,
                                    t: toRawFilter(filter)
                                });
                            }
                        }}></input>
                </span>
            </div>

            {(completions?.additional?.length ?? 0) > 0 && focused &&
                <div style={{ position: "absolute", width: "100%", zIndex: 3 }}>
                    <div className="plate ppad">
                        {completions?.additional?.map(x => <SelectableItem action={() => {
                            if (p.changed) {
                                const rawFilters = state ? toRawFilters(state) : "";
                                const query = parseRawQuery((rawFilters ? `${rawFilters} ` : "") + `${state.t ?? ""}${x} `);
                                p.changed(query);
                            }
                            input?.focus();
                        }}><span style={{ color: "#8c9399" }}>{completions.base}</span><span>{x}</span></SelectableItem>)}
                    </div>
                </div>
            }
        </div>
    </div>;
}

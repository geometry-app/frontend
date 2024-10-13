import React from 'react';
import { QueryRequest } from "../../services/search/models";
import FilterView from "./FilterView";
import './advanceInput.css';

export interface IRequestViewProps {
    request: QueryRequest
}

export default function RequestView(p: IRequestViewProps) {
    return <div style={{ margin: "0.5em 0" }}>
        {p.request.f && p.request.f.map(x => <FilterView filter={x} />)}
        {p.request.t && <span>{p.request.t}</span>}
    </div>
}

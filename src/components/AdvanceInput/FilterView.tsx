import React from 'react';
import { Filter } from '../../services/search/models';
import { readable } from '../../services/search/QueryBuilder';
import './advanceInput.css';

export interface IFilterViewProps {
    filter: Filter
}

export default function FilterView(p: IFilterViewProps) {
    return <span className="filter-highlight" style={{ marginRight: "0.5em", alignContent: "center" }}>
        <span>{p.filter.n}</span>
        <span> {readable(p.filter.o)}</span>
        <span> {p.filter.v}</span>
    </span>
}

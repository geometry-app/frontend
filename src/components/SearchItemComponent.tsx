import React from 'react';
import { HighlightText } from './HighlightText';
import { SearchItem } from '../services/search/models';

interface SearchItemProps {
    item: SearchItem
}

export default function SearchItemComponent(p: SearchItemProps) {
    return <div className='plate rounded animated border-default'>
        <p style={{fontSize: "20px"}}><HighlightText text={p.item.name} /></p>
        <p className='id-span'>{p.item.id}</p>
        <p style={{margin: "6px 0 0 0"}}><HighlightText text={p.item.description} /></p>
        {/*<p style={{margin: "6px 0 0 0", fontSize: "13px"}}>Not found: <i>letter</i></p>*/}
    </div>
}

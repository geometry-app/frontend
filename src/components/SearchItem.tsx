import React from 'react';
import { SearchItemContract } from '../server/Contracts.tsx';
import { HighlightText } from './HighlightText.tsx';

interface SearchItemProps {
    item: SearchItemContract
}

const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
    return <div className='plate rounded animated border-default'>
        <p style={{fontSize: "20px"}}><HighlightText text={item.name} /></p>
        <p className='id-span'>{item.id}</p>
        <p style={{margin: "6px 0 0 0"}}><HighlightText text={item.description} /></p>
        {/*<p style={{margin: "6px 0 0 0", fontSize: "13px"}}>Not found: <i>letter</i></p>*/}
    </div>
}

export default SearchItem;
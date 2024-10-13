import React from 'react'
import './tag.css';

export interface ITagProps {
    text: string,
    onClick: () => void
}

export default function Tag(p: ITagProps) {
    return <div onClick={p.onClick} className='tag transitioned'>
        <span>{p.text}</span>
    </div>;
}
import React from 'react';
import { IHaveChild } from "../../common/IHaveChild";

export interface ISelectableItemProps extends IHaveChild {
    action: () => void
}

export default function SelectableItem(p: ISelectableItemProps) {
    return <p tabIndex={0} onKeyDown={e => {
        if (e.key === "Enter")
            p.action();
    }} onClick={p.action}>{p.children}</p>
}

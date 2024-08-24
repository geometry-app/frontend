import React from 'react';
import { useNavigate } from 'react-router';

interface IRLinkProps {
    link: string,
    children: React.ReactNode
}

const RLink: React.FC<IRLinkProps> = (p) => {
    const navigate = useNavigate();
    return <div onClick={e => navigate(p.link)}>
        <p style={{cursor: 'default'}}>{p.children}</p>
    </div>
}

export default RLink;
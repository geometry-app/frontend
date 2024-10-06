import React from 'react';
import './animations.css';

interface FadeInFromDownProps {
    children: React.ReactNode,
    animationDelay?: number
}

export const FadeInFromDown: React.FC<FadeInFromDownProps> = p => {
    return <div className="fadeInFromDown" style={{animationDelay: p.animationDelay ? p.animationDelay + "s" : '0s'}}>
        {p.children}
    </div>
}

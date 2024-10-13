import React, { CSSProperties, useEffect, useState } from 'react';
import { HighlightedString } from '../../services/models';
import SeededRandomUtilities from 'seeded-random-utilities';

export interface IRouletteSegment {
    text?: HighlightedString,
    icon: string
}

export interface IRouletteProps {
    radius: number,
    segments: IRouletteSegment[],
    manager: RollManager,
    onComplite: (value: string | any) => void
}

export interface RollManager {
    stop: boolean
}

const Roulette: React.FC<IRouletteProps> = p => {
    const name = p.segments[0].text?.items[0].value;
    const rand = new SeededRandomUtilities(name);
    const rand360 = Math.floor((rand.getRandomIntegar(65535, 0) / 65535) * 360);
    const randSpins = 3 + Math.floor((rand.getRandomIntegar(65535, 0) / 65535) * 2);
    const randSeconds = 5 + (rand.getRandomIntegar(65535, 0) / 65535) * 3;
    const rand90 = Math.floor((rand.getRandomIntegar(65535, 0) / 65535) * 90);
    const t = `translate(120, 120) rotate(${rand360}deg)`;
    const style: CSSProperties = {
        transform: `translate(1200px, 1200px) rotate(${rand360}deg)`,
        animation: 'roulette_spin',
        animationDelay: '1s',
        animationDuration: `${randSeconds}s`,
        animationFillMode: 'forwards'
    };

    const content = <svg key={name} xmlns="http://www.w3.org/2000/svg" width={p.radius * 2} height={p.radius * 2} viewBox="0 0 2400 2400">
        <style>
            {
                `@keyframes roulette_spin {
                from {
                    transform: translate(1200px, 1200px) rotate(${rand360}deg);
                }
                to {
                    transform: translate(1200px, 1200px) rotate(${45 - rand90 + (randSpins * 360)}deg);
                }
            }`
            }
        </style>
        <style>
            {
                `.flame-gradient {
                fill: url(#flame)
            }
            
            .shadow-text {
                filter: drop-shadow(0px 0px 16px #feeed8)
            }
            `
            }
        </style>
        <defs>
            <radialGradient id="flame" >
                <stop offset="0%" stop-color="#ffc982" />
                <stop offset="80%" stop-color="#fdd39d" />
                <stop offset="95%" stop-color="#ffefd8" />
                <stop offset="100%" stop-color="#ffffff" />
            </radialGradient>
        </defs>
        <g style={style} >
            <circle className='flame-gradient' r="1000" />
            {p.segments.map((x, i) => {
                return <g key={i} transform={`rotate(${i * 90})`} stroke="#fef0d9" strokeWidth={5}>
                    <path d="M0 0 700 700 A 990 990 0 0 1 -700 700Z" fillOpacity={0} />
                    <path d="M0 0 650 650 A 950 990 0 0 1 -650 650Z" fillOpacity={0} />

                    <path id='a' d='M-700 700 700 700' stroke='#000' strokeWidth={0}></path>
                    <text className='shadow-text' y={80} textAnchor='middle' fontSize={120} fill="#000" fontWeight="bold" strokeWidth={0} strokeLinecap="butt" stroke="#fff">
                        <textPath href="#a" startOffset="50%" textAnchor="middle">{x.text?.items.map(x => x.value).join("")}</textPath>
                    </text>
                    <image href={x.icon} width={380} x={-190} y={150} />
                </g>
            })}
        </g>
        <path d="M1200 2300 1200 2100 1280 2300Z" fill="#1D4561" />
        <path d="M1200 2300 1200 2100 1120 2300Z" fill="#2A638C" />
    </svg>
    const manager = p.manager;
    setTimeout(() => {
        if (!manager.stop)
            p.onComplite(null);
    }, (2 + randSeconds) * 1000);
    return <div style={{ display: 'grid', justifyContent: 'center' }}>
        <div style={{ position: "relative" }}>
            <img src={`/images/fire_wheel.png`} width={p.radius * 2 * 1.3}></img>
            <div style={{ position: "absolute", width: p.radius * 2 * 1.3, top: 150, justifyContent: "center", display: 'grid' }}>
                {content}
            </div>
        </div>
    </div>
}

export {
    Roulette,
}
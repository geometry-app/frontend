import React from 'react';
import { SearchItem } from '../services/search/models';
import { Plate } from './Plate';
import { getDemonDifficultyImage } from '../common/LevelHelper';
import Text, { TextStyle } from './Text/Text';
import { HighlightText, toDefaultText } from './HighlightText';
import LockSvg from '../svgs/lock.svg';
import BadgeComponent from './Badge/BadgeComponent';
import { LengthType } from '../services/models';

interface ILevelProps {
    level: SearchItem,
    percent?: number
}

export default function Level(p: ILevelProps) {
    return <div>
        <Plate>
            <div style={{display: "grid", gridTemplateColumns: "76px auto"}}>
                <div>
                    <img
                        src={getDemonDifficultyImage(p.level.isDemon, p.level.difficultyIcon)}
                        width="60px"
                        />
                </div>
                <div>
                    <div style={{display: "flex", marginBottom: "8px"}}>
                        <Text textToCopy={p.level.id.toString()}>{p.level.id}</Text>
                        <p style={{marginLeft: "12px"}}>{toDefaultText(p.level.name)}</p>
                        {p.percent && <p style={{marginLeft: "4px"}}>({p.percent}%)</p>}
                    </div>
                    <div style={{marginBottom: "8px"}}>
                        {<Text style={TextStyle.Additional}><HighlightText text={p.level.description}></HighlightText></Text>}
                    </div>
                    { p.level.server != "geometrydash" &&
                        <div style={{marginBottom: "8px"}}>
                            <Text style={TextStyle.Additional}>Server: GDPS Editor</Text>
                        </div>
                    }
                    { p.level.password && 
                        <div style={{marginBottom: "8px"}}>
                            <p><LockSvg style={{verticalAlign: "middle"}} stroke='#000' width={22} height={22}></LockSvg><span style={{verticalAlign: "middle", marginLeft: "4px"}}>{p.level.password}</span></p>
                        </div>
                    }
                    { p.level.badges && 
                        <div style={{display: "flex"}}>
                            {p.level.badges.map((x, i) => <BadgeComponent badge={x}/>)}
                        </div>
                    }
                    <p>likes: {p.level.likes}</p>
                    <p>length: {LengthType[p.level.length]}</p>
                </div>
            </div>
        </Plate>
    </div>
}

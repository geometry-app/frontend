import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { FadeInFromDown } from '../components/Animations/FadeInFromDown';
import AdvanceInput from '../components/AdvanceInput/AdvanceInput';
import { buildQuery } from '../services/search/QueryBuilder';
import { Button, ButtonStyle } from '../components/Button';
import { ButtonSquare, ButtonSquareStyle } from '../components/ButtonSquare';
import RouletteSvg from '../svgs/roulette.svg';
import GithubMark from '../svgs/github-mark.svg';
import Text, { TextStyle } from '../components/Text/Text';

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    return <div className="main-container">
        <div style={{ minHeight: "70vh" }}>
            <FadeInFromDown>
                <div style={{ height: "10vh" }}></div>
                <AdvanceInput submit={x => navigate("/search?query=" + buildQuery(x))}/>
            </FadeInFromDown>
            <FadeInFromDown>
                <div style={{display: "table", margin: "0 auto" }}>
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "24px"}}>
                            <Button
                                centered={true}
                                style={ButtonStyle.White}
                                text={`I'll be lucky!`}
                                onClick={_ => navigate("/search?" + new URLSearchParams({ lucky: "1" }))}
                                width={170}
                            ></Button>
                        </div>
                    </div>
                </div>
            </FadeInFromDown>
            <div style={{height: "50px"}}></div>
            <FadeInFromDown animationDelay={0.2}>
                <div style={{display: "table", margin: "0 auto" }}>
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "24px"}}>
                            <ButtonSquare
                                text='Roulettes'
                                icon={<RouletteSvg stroke='#000' width={55} height={55} style={{display: "block", margin: 'auto'}}></RouletteSvg>}
                                onClick={e => navigate("/roulette")}
                            ></ButtonSquare>
                        </div>
                    </div>
                </div>
            </FadeInFromDown>
        </div>
        <FadeInFromDown animationDelay={0.3}>
            <div style={{display: "table", margin: "0 auto", textAlign: "center" }}>
                <Text style={TextStyle.Additional}>Made with <a href="https://github.com/Folleach/GeometryDashAPI" target="_blank"><GithubMark>a</GithubMark> GeometryDashAPI</a></Text>
            </div>
        </FadeInFromDown>
    </div>
}

export default MainPage;

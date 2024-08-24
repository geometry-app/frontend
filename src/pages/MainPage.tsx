import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FadeInFromDown} from '../components/Animations/FadeInFromDown.tsx';
import {TextField} from '../components/TextField.tsx';
import {useLanguage} from '../contexts/LagnuageContext.tsx';
import {ButtonSquare} from '../components/ButtonSquare.tsx';
import {ReactComponent as RouletteSvg} from '../svgs/roulette.svg';
import Text, {TextStyle} from "../components/Text.tsx";
import {ReactComponent as GithubMark} from '../svgs/github-mark.svg';
import {Button, ButtonStyle} from "../components/Button.tsx";

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { getLang } = useLanguage();
    const [text, setText] = useState('');

    return <div className="main-container">
        <div style={{ minHeight: "70vh" }}>
            <FadeInFromDown>
                <div style={{ height: "10vh" }}></div>
                <div id="search-box" className="animated">
                    <TextField children={text} onChange={t => setText(t)} apply={() => navigate("/search?" + new URLSearchParams({ query: text }))}></TextField>
                </div>
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
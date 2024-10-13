import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouletteState, useRoulette } from '../context/RouletteContext';
import { IRouletteSegment, Roulette } from '../components/Roulette/Roulette';
import { getDemonDifficultyImage } from '../common/LevelHelper';
import { Button } from '../components/Button';
import Text, { TextStyle } from '../components/Text/Text';
import { TextField } from '../components/TextField';
import { toDefaultText } from '../components/HighlightText';
import Level from '../components/Level';
import { CopyRouletteComponent } from '../components/Roulette/CopyRouletteComponent';
import { MainRouletteSubpage } from './Roulette/MainRouletteSubpage';
import { CreatingNewRouletteSubpage } from './Roulette/CreatingNewRouletteSubpage';
import { FinishRouletteSubpage } from './Roulette/FinishedRouletteSubpage';
import { NotFoundSubpage } from './Roulette/NotFoundSubpage';
import { PrepareToStartSubpage } from './Roulette/PrepareToStartSubpage';
import { LengthType } from '../services/models';

const RoulettePage: React.FC = () => {
    const [viewState, setViewState] = useState<number>(1);
    const [stopManager, setStopManager] = useState({stop: false});
    console.debug("VIEW STATE: " + viewState);

    const roulette = useRoulette();
    const navigate = useNavigate();
    const state = roulette.getState();

    // useEffect(() => {
    //     if (viewState == ViewRouletteState.Rolling)
    //     {
    //         setTimeout(() => setViewState(ViewRouletteState.Idle), 7000);
    //     }
    // }, [viewState])

    const segments: IRouletteSegment[] = [
        {
            text: roulette.getNext()?.levels[0].name,
            icon: getDemonDifficultyImage(roulette.getNext()?.levels[0].isDemon!, roulette.getNext()?.levels[0].difficultyIcon!)
        },
        {
            text: roulette.getNext()?.levels[1].name,
            icon: getDemonDifficultyImage(roulette.getNext()?.levels[1].isDemon!, roulette.getNext()?.levels[1].difficultyIcon!)
        },
        {
            text: roulette.getNext()?.levels[2].name,
            icon: getDemonDifficultyImage(roulette.getNext()?.levels[2].isDemon!, roulette.getNext()?.levels[2].difficultyIcon!)
        },
        {
            text: roulette.getNext()?.levels[3].name,
            icon: getDemonDifficultyImage(roulette.getNext()?.levels[3].isDemon!, roulette.getNext()?.levels[3].difficultyIcon!)
        }
    ];

    const wait = () => {
        return <div>WAITING</div>
    };

    const tryRolling = () => {
        return <>
            <Roulette radius={360} manager={stopManager} segments={segments} onComplite={e => {
                if (stopManager.stop)
                    return;
                stopManager.stop = true;
                setViewState(0);
            }}></Roulette>
            <Button text='Skip'
                centered={true}
                onClick={e => {
                    if (stopManager.stop)
                        return;
                    stopManager.stop = true;
                    setViewState(0);
                }}></Button>
        </>
    }

    function playing() {
        return (
            <div>
                <div style={{ position: "relative", textAlign: "center", width: "100%" }}>
                    <div style={{ position: 'absolute', width: "100%", zIndex: 3, marginTop: "8em" }}>
                        <h1 className='roulette-gradient-text2'>{roulette.getRoulette().name}</h1>
                    </div>
                    <div style={{ position: 'absolute', width: "100%", zIndex: 3, marginTop: "8em" }}>
                        <h1 className='roulette-gradient-text'>{roulette.getRoulette().name}</h1>
                    </div>
                </div>
                <div style={{ marginTop: "-8em" }}>
                    {tryRolling()}
                </div>
                {<>
                    <Button text='Take Me Home' onClick={e => navigate("/")} centered={true}></Button>
                    <TextField key={viewState}
                        hint={`${viewState == 0 ? toDefaultText(roulette.getNext()?.levels[0].name) : "***** ****"} progress (at least ${(roulette.getProgress(0, true)?.progress ?? 0) + 1}%)`}
                        filter={e => Number(e) > (roulette.getProgress(0, true)?.progress ?? 0) && Number(e) <= 100}
                        apply={e => {
                            roulette.setNextProgress(Number(e));
                            setViewState(1);
                            setStopManager({stop: false});
                        }}>{`${(roulette.getProgress(0, true)?.progress ?? 0) + 1}`}</TextField>
                    {viewState == 0 &&
                        <div>
                            <Level
                                level={roulette.getNext()?.levels[0]!}
                            />
                        </div>
                    }
                    {
                        viewState == 1 &&
                        <div style={{filter: "blur(2em)"}}>
                            <Level level={{
                                name: {
                                    items: [{ value: "***** NO NAMED *****", highlighted: false }]
                                },
                                difficulty: 0,
                                difficultyIcon: 0,
                                demonDifficulty: 0,
                                description: { items: [{ value: "why did you see this text... there is nothing to seee....", highlighted: false }] },
                                id: 123456789,
                                isDemon: false,
                                length: LengthType.Tiny,
                                likes: 100500,
                                type: 1,
                                notFound: [],
                                server: "geometrydash"
                            }} />
                        </div>
                    }
                </>
                }
                {roulette.getAvaliableList()?.reverse().map((x, i) => {
                    const res = <div>
                        <Level
                            level={x.levels[0]}
                            percent={roulette.getProgress(i, true)?.progress}
                        ></Level>
                    </div>;
                    return res;
                })}
                <CopyRouletteComponent />
            </div>
        )
    }

    return <div className="main-container">
        {state == RouletteState.Main && <MainRouletteSubpage />}
        {state == RouletteState.UserCreateNew && <CreatingNewRouletteSubpage />}
        {state == RouletteState.WaitingToPrepare && wait()}
        {state == RouletteState.Roulette && playing()}
        {state == RouletteState.Finish && <FinishRouletteSubpage />}
        {state == RouletteState.NotFound && <NotFoundSubpage />}
        {state == RouletteState.PrepareToStart && <PrepareToStartSubpage />}
    </div>
}

export default RoulettePage;

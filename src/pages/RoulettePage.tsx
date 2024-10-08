import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
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

enum ViewRouletteState {
    Rolling,
    Idle
}

const RoulettePage: React.FC = () => {
    const [viewState, setViewState] = useState<ViewRouletteState>(ViewRouletteState.Rolling);
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
        if (viewState == ViewRouletteState.Rolling) {
            let rollManager = {"stop": false};
            return <>
                <Roulette radius={360} manager={rollManager} segments={segments} onComplite={e => setViewState(ViewRouletteState.Idle)}></Roulette>
                <Button text='Skip'
                        centered={true}
                        onClick={e => {
                    rollManager.stop = true;
                    setViewState(ViewRouletteState.Idle)
                }}></Button>
            </>
        }
    }

    function playing() {
        return (
            <div>
                <Text style={TextStyle.MainHeader}>Roulette "{roulette.getRoulette().name}"</Text>
                {viewState == ViewRouletteState.Rolling && tryRolling()}
                {viewState == ViewRouletteState.Idle && <>
                    <Button text='Take Me Home' onClick={e => navigate("/")} centered={true}></Button>
                    <TextField
                        hint={`${toDefaultText(roulette.getNext()?.levels[0].name)} progress (at least ${(roulette.getProgress(0, true)?.progress ?? 0) + 1}%)`}
                        filter={e => Number(e) > (roulette.getProgress(0, true)?.progress ?? 0) && Number(e) <= 100}
                        apply={e => {
                            roulette.setNextProgress(Number(e));
                            setViewState(ViewRouletteState.Rolling);
                    }}>{`${(roulette.getProgress(0, true)?.progress ?? 0) + 1}`}</TextField>
                    <Level
                        level={roulette.getNext()?.levels[0]!}
                    />
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

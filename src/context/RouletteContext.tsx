import { stat } from 'fs';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { get, post } from '../server/Backbone';
import { IHaveChild } from '../common/IHaveChild';
import { SearchItem } from '../services/search/models';

enum RouletteState {
    Main,
    Recreating,
    UserCreateNew,
    WaitingToPrepare,
    Roulette,
    Finish,
    NotFound,
    PrepareToStart
}

interface IRouletteStateContainer {
    state: RouletteState,
    session: IRouletteSession | null,
    currentIndex: number
}

interface IRouletteSequence {
    levels: SearchItem[]
}

interface IRoulette {
    rouletteId: string,
    name: string,
    isPublished: boolean,
    levels: IRouletteSequence[]
}

interface IProgress {
    progress: number
    levelId: number,
    sequenceNumber: number
}

interface IRouletteSession {
    sessionId: string,
    isStarted: boolean,
    roulette: IRoulette,
    progress: IProgress[]
}

export interface IDemonWeights {
    easyDemon: number,
    mediumDemon: number,
    hardDemon: number,
    insaneDemon: number,
    extremeDemon: number
}

interface ICreateSessionRequest {
    type: string,
    name: string,
    server: string,
    weights: IDemonWeights
}

interface IRouletteContext {
    getState(): RouletteState,
    getProgress(index: number, rev: boolean): IProgress | null,
    setNextProgress(percent: number): void,
    getAvaliableList(): IRouletteSequence[] | null,
    getNext(): IRouletteSequence | null,
    start(): void,
    // startNew(): void,
    open(id: string): void,
    goHome(): void,
    create(name: string, type: string, server: string, weights: IDemonWeights): Promise<boolean>,
    getRoulette(): IRoulette,
    setPublished(id: string): void,
    addRouletteToMe(): void
}

interface ISetProgressRequest {
    sessionId: string,
    rouletteId: string,
    sequenceNumber: number,
    progress: number
}

interface ISetProgressResponse {
    success: boolean
}

interface IAddRouletteResponse {
    rouletteId: string
}

interface IAddRouletteRequest {
    added: boolean
}

const RouletteContext: React.Context<IRouletteContext> = React.createContext<IRouletteContext>(null!);

const useRoulette = (): IRouletteContext => {
    return useContext<IRouletteContext>(RouletteContext);
}

const RouletteProvider: React.FC<IHaveChild> = (p) => {
    const sessionId = localStorage.getItem('roulette/sessionId');
    const [state, setState] = useState<IRouletteStateContainer>({
        state: RouletteState.Main,
        session: null,
        currentIndex: 0
    });
    const [params, setParams] = useSearchParams();
    const rouletteId = params.get("id");
    console.log("id: " + rouletteId);

    function getSession() {
        return localStorage.getItem('roulette/sessionId')
    };

    useEffect(() => {
        const id = params.get('id');
        if (id) {
            get<IRouletteSession>("roulette?rouletteId=" + id, {
                "sessionId": getSession()
            })
            .then(response => {
                if (!response) {
                    setState({
                        state: RouletteState.NotFound,
                        session: null,
                        currentIndex: 0
                    });
                    return;
                }
                if (!response.isStarted) {
                    setRoulette(response, RouletteState.PrepareToStart);
                    return;
                }
                setRoulette(response);
            });
        }
    }, [params])

    // useEffect(() => {
    //     if (state.state != RouletteState.Recreating)
    //         return;

    //     console.log('try restore session');
    //     get<IRouletteSession>("roulette?sessionId=" + sessionId)
    //         .then(response => {
    //             if (!response) {
    //                 setState({
    //                     state: RouletteState.Main,
    //                     session: null,
    //                     currentIndex: 0
    //                 });
    //                 return;
    //             }
    //             setRoullette(response);
    //         });
    // }, [state]);

    function setRoulette(response: IRouletteSession, overrideState?: RouletteState) {
        localStorage.setItem('roulette/sessionId', response.sessionId);
        const next = nextIndex(response.progress);
        console.info(next);
        if (response.progress?.find(x => x.progress == 100))
        {
            setState({
                state: RouletteState.Finish,
                session: response,
                currentIndex: nextIndex(response.progress)
            });
            return;
        }
        setState({
            state: overrideState ?? RouletteState.Roulette,
            session: response,
            currentIndex: nextIndex(response.progress)
        });
        params.set("id", response.roulette.rouletteId);
        setParams(params);
    }

    const nextIndex = (progress: IProgress[]): number => {
        let max = 0;
        let found = false;
        if (!progress)
            return 0;
        progress.forEach(item => {
            if (max < item.sequenceNumber)
                max = item.sequenceNumber;
            found = true;
        });
        return !found ? 0 : max + 1;
    }

    // ------------------- public -------------------
    const getState = (): RouletteState => {
        return state.state;
    }

    const start = () => {
        setState({
            state: RouletteState.UserCreateNew,
            session: null,
            currentIndex: 0
        });
    }

    const getProgress = (index: number, rev: boolean): IProgress => {
        if (!state.session)
            throw {};
        const idx = rev
            ? state.currentIndex - index - 1
            : index;
        if (idx < 0)
            return {
                levelId: 0,
                progress: 0,
                sequenceNumber: 0
            };
        return state.session.progress[idx];
    }

    const setNextProgress = (percent: number): void => {
        console.log(`progress set to: ${percent}`);
        if (!sessionId || !rouletteId) {
            console.error("not set progress because sessionId or rouletteId is null");
            return;
        }
        post<ISetProgressResponse, ISetProgressRequest>("roulette/progress", {
            sessionId,
            rouletteId,
            sequenceNumber: state.currentIndex,
            progress: percent
        }).then(response => {
            if (!response.success)
                console.error("can not set progress");
        }).catch(e => {
            console.error("error while save progress");
        });

        let progress = state.session!.progress;
        if (!progress)
            progress = [];

        const session: IRouletteSession = {
            progress: progress.concat([{
                levelId: getNext()!.levels[0].id,
                sequenceNumber: state.currentIndex,
                progress: percent
            }]),
            isStarted: state.session!.isStarted,
            roulette: state.session!.roulette,
            sessionId: state.session!.sessionId
        }

        if (percent == 100)
        {
            setState({
                state: RouletteState.Finish,
                session: session,
                currentIndex: state.currentIndex
            })
            return;
        }

        setState({
            state: state.state,
            session: session,
            currentIndex: state.currentIndex + 1
        })
    }

    const getAvaliableList = (): IRouletteSequence[] | null => {
        return state.session?.roulette.levels.slice(0, state.session.progress?.length ?? 0) ?? null;
    }

    const getNext = (): IRouletteSequence | null => {
        return state.session?.roulette.levels[state.currentIndex] ?? null;
    }

    // const startNew = (): void => {
    //     params.delete("id");
    //     setParams(params);
    //     setState({
    //         state: RouletteState.Main,
    //         session: null,
    //         currentIndex: 0
    //     });
    // }

    const open = (id: string) => {
        console.log('try');
        params.set('id', id);
        setParams(params);
    }

    const goHome = () => {
        if (params.values.length > 0)
            setParams({});
        setState({
            state: RouletteState.Main,
            session: null,
            currentIndex: 0
        });
    }

    const create = async (name: string, type: string, server: string, weights: IDemonWeights): Promise<boolean> => {
        return await post<IRouletteSession, ICreateSessionRequest>('roulette', {
            name,
            type,
            server,
            weights
        }, {
            "sessionId": getSession()
        })
            .then(response => {
                setRoulette(response);
                return false;
            })
            .catch(x => {
                console.error(x);
                return true;
            });
    }

    const getRoulette = () => {
        return state.session?.roulette!;
    }

    function setPublished(id: string) {
        if (state.session?.roulette && state.session.roulette.rouletteId === id) {
            state.session.roulette.isPublished = true
            setState({
                state: state.state,
                session: state.session,
                currentIndex: state.currentIndex
            });
        }
    }

    function addRouletteToMe() {
        setRoulette(state.session!);
        post<IAddRouletteRequest, IAddRouletteResponse>("roulette/add", {
            rouletteId: state.session!.roulette.rouletteId
        }, {
            'sessionId': getSession()
        }).catch(e => console.error(e));
    }

    return <RouletteContext.Provider value={{
        getState,
        start,
        getProgress,
        setNextProgress,
        getAvaliableList,
        getNext,
        open,
        goHome,
        create,
        getRoulette,
        setPublished,
        addRouletteToMe
    }}>
        {p.children}
    </RouletteContext.Provider>
}

export {
    RouletteProvider,
    RouletteState,
    useRoulette
}
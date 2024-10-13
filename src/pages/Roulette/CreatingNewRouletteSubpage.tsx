import React, { useState } from 'react';
import { Button, ButtonStyle } from '../../components/Button';
import { IBalance, IRouletteLevelWeights, useRoulette } from '../../context/RouletteContext';
import { Plate, PlateStyle } from '../../components/Plate';
import Text, { TextStyle } from '../../components/Text/Text';
import { TextField } from '../../components/TextField';
import { ChallengeSettingsComponent } from '../../components/Roulette/ChallengeSettingsComponent';
import { QueryRequest } from '../../services/search/models';
import AdvanceInput from '../../components/AdvanceInput/AdvanceInput';
import BadgeComponent from '../../components/Badge/BadgeComponent';
import Tag from '../../components/Tag/Tag';
import { buildQuery, parseQuery, parseRawQuery } from '../../services/search/QueryBuilder';
import { useNavigate } from 'react-router-dom';

interface ICreatingProps {

}

interface IPreparedRoulette {
    name: string,
    query: string
}

const prepared: IPreparedRoulette[] = [
    {
        name: "demons",
        query: "difficulty is demons "
    },
    {
        name: "pointcreate list",
        query: "list is pointcreate "
    },
    {
        name: "shitty",
        query: "list is shitty "
    },
    {
        name: "impossible list",
        query: "list is impossible "
    },
    {
        name: "auto",
        query: "difficulty is auto "
    },
    {
        name: "clear",
        query: ""
    }
];

export const CreatingNewRouletteSubpage: React.FC<ICreatingProps> = (p) => {
    const navigate = useNavigate();
    const roulette = useRoulette();
    const [name, setName] = useState<string>("untitled");
    const [request, setRequest] = useState<QueryRequest>(parseRawQuery(prepared.find(x => true)?.query));
    const [balance, setBalance] = useState<IBalance>();
    const [creatingStatus, setCreatingStatus] = useState(0);

    const validateName = /^[a-zA-Z0-9 -]+$/;
    const warn = !validateName.test(name);

    return <div>
        <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.MainHeader}>Create a new Roulette</Text>
        </Plate>
        {warn && <Text style={TextStyle.Additional}><span style={{ color: "darkred" }}>You should specify roulette name using latin alphabet and numbers</span></Text>}
        <TextField hint='Roulette name' onChange={setName} filter={e => validateName.test(e)}></TextField>
        <div style={{display: 'grid', gridTemplateColumns: 'auto 10em', gap: "0.5em"}}>
            <AdvanceInput prepend={request} submit={() => setRequest(request)} changed={x => setRequest(x)}/>
            <a href={'/search?' + new URLSearchParams({ query: buildQuery(request) })}>
                <div style={{ alignContent: "center", justifyContent: "center", textAlign: "center", height: "100%" }}>
                    <p>Search</p>
                    <p style={{ "color": "#888", fontSize: "0.75em" }}>{balance?.total ?? ""}</p>
                </div>
            </a>
            {/* <Button text='search' centered={true} onClick={() => navigate(), { })}/> */}
        </div>

        <div style={{display: "flex"}}>
            {prepared.map(x => <Tag text={x.name} onClick={() => setRequest(parseRawQuery(x.query))}/>)}
        </div>

        <ChallengeSettingsComponent request={request} onChange={setBalance} />

        {creatingStatus != 1 && <>
            <div style={{ display: "grid", gap: "20px", justifyContent: "center" }}>
                {creatingStatus == 2 && <span style={{ color: "#a73333" }}><Text style={TextStyle.Default}>An error occurred during the creation of the roulette :(</Text></span>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "50% 50%", gap: "20px", justifyContent: "center" }}>
                <Button text='Create' style={ButtonStyle.Positive} centered={true} onClick={e => {
                    if (validateName.test(name)) {
                        setCreatingStatus(1);
                        roulette.create(name, balance!.weights, request).then(error => {
                            if (error)
                                setCreatingStatus(2);
                        })
                    }
                }} />
                <Button text='Cancel' style={ButtonStyle.Danger} centered={true} onClick={e => roulette.goHome()} />
            </div>
        </>
        }
        {creatingStatus == 1 && <div style={{ display: "grid", gap: "20px", justifyContent: "center" }}>
            <Text style={TextStyle.MainHeader}>Creating a new roulette...</Text>
        </div>}
    </div>

}

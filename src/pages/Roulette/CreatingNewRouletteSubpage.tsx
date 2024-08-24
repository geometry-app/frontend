import React, {useState} from 'react';
import {Button, ButtonStyle} from '../../components/Button.tsx';
import {useRoulette} from '../../contexts/RouletteContext.tsx';
import Text, {TextStyle} from '../../components/Text.tsx';
import {TextField} from '../../components/TextField.tsx';
import {Plate, PlateStyle} from "../../components/Plate.tsx";
import {ChallengeSettingsComponent} from "../../components/Roulette/ChallengeSettingsComponent.tsx";

interface ICreatingProps {

}

export const CreatingNewRouletteSubpage: React.FC<ICreatingProps> = (p) => {
    const roulette = useRoulette();
    const [name, setName] = useState("");
    const [type, setType] = useState("default");
    const [server, setServer] = useState("geometrydash");
    const [warn, setWarn] = useState(false);
    const [creatingStatus, setCreatingStatus] = useState(0);
    const [weights, setWeights] = useState({
        easyDemon: 0.3,
        mediumDemon: 0.3,
        hardDemon: 0.3,
        insaneDemon: 0.3,
        extremeDemon: 0.3
    })

    const validateName = /^[a-zA-Z0-9 -]+$/;

    return <div>
        <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.MainHeader}>Create a new Roulette</Text>
        </Plate>
        {warn && <Text style={TextStyle.Additional}><span style={{color: "darkred"}}>You should specify roulette name using latin alphabet and numbers</span></Text>}
        <TextField hint='Roulette name' onChange={e => {
            const valid = validateName.test(e);
            setName(e);
            if (valid) {
                setWarn(false);
            }
            else
                setWarn(true);
        }} filter={e => validateName.test(e)}></TextField>


        {type !== "impossible_list" && type !== "auto" && type !== "shitty" && <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Default}>Select Game Server</Text>
            <div style={{display: "grid", gridTemplateColumns: "250px 250px", justifyContent: "center", gap: "20px"}}>
                <Button text={"Geometry Dash"} style={server == "geometrydash" ? ButtonStyle.Positive : ButtonStyle.White} centered={true} onClick={e => setServer("geometrydash")}/>
                <Button text={"GDPS Editor"} style={server == "gdpseditor" ? ButtonStyle.Positive : ButtonStyle.White} centered={true} onClick={e => setServer("gdpseditor")}/>
            </div>
        </Plate>}

        <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Default}>Select your Game Mode</Text>
            <div style={{display: "grid", gridTemplateColumns: "250px 250px", justifyContent: "center", gap: "20px"}}>
                <Button text={"Normal"} style={type == "default" ? ButtonStyle.Positive : ButtonStyle.White} centered={true} onClick={e => setType("default")}/>
                <Button text={"Challenge"} style={type == "challenge" ? ButtonStyle.Positive : ButtonStyle.White} centered={true} onClick={e => setType("challenge")}/>
                <Button text={"Impossible List"} style={type == "impossible_list" ? ButtonStyle.Positive : ButtonStyle.White} centered={true} onClick={e => {
                    setType("impossible_list");
                    setServer("geometrydash");
                }}/>
                <Button text={"Auto"} style={type == "auto" ? ButtonStyle.Positive : ButtonStyle.White} centered={true} onClick={e => {
                    setType("auto");
                    setServer("geometrydash");
                }}/>
                <Button text={"Shitty"} style={type == "shitty" ? ButtonStyle.Positive : ButtonStyle.White} centered={true} onClick={e => {
                    setType("shitty");
                    setServer("geometrydash");
                }}/>
            </div>
        </Plate>

        {type === "default" && <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Additional}>In Normal mode, a random level is selected from all available levels each time you play.</Text>
            <Text style={TextStyle.Additional}>This mode is great for a varied and unpredictable experience. Good luck!</Text>
        </Plate>}
        {type === "challenge" && <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Additional}>In Challenge mode, you can set the probability of encountering different difficulty levels.</Text>
            <Text style={TextStyle.Additional}>Once you've set your probabilities, the game will randomly select a difficulty based on those settings. And then a level will be selected that matches the current difficulty. Challenge mode is perfect for players who want to fine-tune their experience and test their skills against a specific level of difficulty. Good luck!</Text>
            <div style={{marginTop: "12px"}}>
                <Text style={TextStyle.Additional}>By default, the balance is set to be similar to the Normal mode.</Text>
            </div>
        </Plate>}
        {type === "impossible_list" && <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Additional}>In the Impossible List mode, you will only come across levels from the site https://www.impossible-list.com/</Text>
        </Plate>}
        {type === "auto" && <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Additional}>Ha-ha, can you pass this INCREDIBLY difficult roulette of AUTO levels?</Text>
        </Plate>}
        {type === "shitty" && <Plate style={PlateStyle.Simple}>
            <Text style={TextStyle.Additional}>Abandon the hope of all those who enter here</Text>
        </Plate>}

        {type === "challenge" && <ChallengeSettingsComponent onChange={e => setWeights(e)}/>}

        {creatingStatus != 1 && <>
            <div style={{display: "grid", gap: "20px", justifyContent: "center"}}>
                {creatingStatus == 2 && <span style={{color: "#a73333"}}><Text style={TextStyle.Default}>An error occurred during the creation of the roulette :(</Text></span>}
            </div>
            <div style={{display: "grid", gridTemplateColumns: "50% 50%", gap: "20px", justifyContent: "center"}}>
                <Button text='Create' style={ButtonStyle.Positive} centered={true} onClick={e => {
                    if (validateName.test(name)) {
                        setCreatingStatus(1);
                        roulette.create(name, type, server, weights).then(error => {
                            if (error)
                                setCreatingStatus(2);
                        })
                    }
                }}/>
                <Button text='Cancel' style={ButtonStyle.Danger} centered={true} onClick={e => roulette.goHome()}/>
            </div>
        </>
        }
        {creatingStatus == 1 && <div style={{display: "grid", gap: "20px", justifyContent: "center"}}>
            <Text style={TextStyle.MainHeader}>Creating a new roulette...</Text>
        </div>}
    </div>

}

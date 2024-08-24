import React from "react";
import {Plate, PlateStyle} from "../../components/Plate.tsx";
import Text, {TextStyle} from "../../components/Text.tsx";
import {Button} from "../../components/Button.tsx";
import {useNavigate} from "react-router";

export const NotFoundSubpage: React.FC = () => {
    const navigate = useNavigate();
    return <Plate style={PlateStyle.Simple}>
        <Text style={TextStyle.MainHeader}>404 Not Found</Text>
        <Text style={TextStyle.Additional}>The roulette you're trying to access does not exist.</Text>
        <Plate style={PlateStyle.Simple}>
            <div style={{display: "grid", gridTemplateColumns: "250px", justifyContent: "center", gap: "20px"}}>
                <Button text={"Take Me Home"} centered={true} onClick={e => navigate('/')}/>
            </div>
        </Plate>
    </Plate>
}
import React, { useContext, useState } from 'react';
import { Action } from '../dotNetFeatures';
import { DefaultProp } from '../Utils/DefaultProp';

interface ISettings {
    animations: boolean,
    setAnimations: Action<boolean>,
}

const SettingsContext: React.Context<ISettings> = React.createContext<ISettings>(null!);

const useSettings = (): ISettings => {
    return useContext(SettingsContext);
}

const SettingsProvider: React.FC<DefaultProp> = (p) => {
    const [animations, setAnimations] = useState(true);

    return <SettingsContext.Provider value={{animations: animations, setAnimations: setAnimations}}>
        {p.children} 
    </SettingsContext.Provider>
}

export {
    SettingsProvider,
    useSettings
}
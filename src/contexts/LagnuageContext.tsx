import React, { useContext, useState } from 'react';
import { DefaultProp } from '../Utils/DefaultProp';

interface ILanguageContext {
    getLang(key: string): string,
    setLang(lang: string): void
}

const LanguageContext: React.Context<ILanguageContext> = React.createContext<ILanguageContext>(null!);

const useLanguage = (): ILanguageContext => {
    return useContext<ILanguageContext>(LanguageContext);
}

const LagnuageProvider: React.FC<DefaultProp> = (p) => {
    const [language, setLanguage] = useState<string>(navigator.language);

    const get = (key: string) => {
        return `${language}/${key}`;
    }

    return <LanguageContext.Provider value={{getLang: get, setLang: setLanguage}}>
        {p.children}
    </LanguageContext.Provider>
}

export {
    LagnuageProvider,
    useLanguage
}
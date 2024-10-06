import React, { useContext, useState } from 'react';
import { IHaveChild } from '../common/IHaveChild';

interface ILanguageContext {
    getLang(key: string): string,
    setLang(lang: string): void
}

const LanguageContext: React.Context<ILanguageContext> = React.createContext<ILanguageContext>(null!);

const useLanguage = (): ILanguageContext => {
    return useContext<ILanguageContext>(LanguageContext);
}

const LagnuageProvider: React.FC<IHaveChild> = (p) => {
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

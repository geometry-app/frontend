import React, { useContext, useState } from 'react';
import { DefaultProp } from '../Utils/DefaultProp';
type Account = {
    id: string,
    name: string
}

interface IAccount {
    account: Account,
    setAccount(account: Account): void
}

const AccountContext: React.Context<IAccount> = React.createContext<IAccount>(null!);

const useAccount = (): IAccount => {
    return useContext<IAccount>(AccountContext);
}

const AccountProvider: React.FC<DefaultProp> = (p) => {
    const [account, setAccount] = useState<Account>(null!);

    // const get = (key: string) => {
    //     return "Ukek";
    // }

    return <AccountContext.Provider value={{account, setAccount}}>
        {p.children}
    </AccountContext.Provider>
}

export {
    AccountProvider,
    useAccount
}
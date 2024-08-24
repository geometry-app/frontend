import React from 'react';
import { useAccount } from '../../contexts/AccountContext';
import { useLanguage } from '../../contexts/LagnuageContext';
import RLink from '../RLink';
import './AccountBadge.css';

const AccountBadge: React.FC = () => {
    const { getLang } = useLanguage();
    const { account } = useAccount();

    const loginForm = () => {
        return <RLink link="/login">{getLang('common.login')}</RLink>
    }

    const accountForm = () => {
        return <p>{account.name}</p>
    }

    return <div className="accountBlank">
        {account == null ? loginForm() : accountForm() }
    </div>;
}

export default AccountBadge;

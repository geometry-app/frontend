import React from 'react';
import ReactDOM from 'react-dom/client';
import { get } from './server/Backbone';
import './index.css';
import App from './App';

import { Buffer } from 'buffer';
window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<App />);

interface IBackendVersionResponse {
    version: string,
    environment: string
}

get<IBackendVersionResponse>("version").then(x => {
    console.info(`backend version: ${x?.version} (${x?.environment})`);
});

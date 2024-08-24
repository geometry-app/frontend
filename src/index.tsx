import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import { get } from './Backbone.tsx';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

interface IBackendVersionResponse {
  version: string,
  environment: string
}

get<IBackendVersionResponse>("version").then(x => {
  console.info(`backend version: ${x?.version} (${x?.environment})`);
});

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LagnuageProvider } from './contexts/LagnuageContext.tsx';
import { SettingsProvider } from './contexts/SettingsContext.tsx';
import { AccountProvider } from './contexts/AccountContext.tsx';
import MainPage from './pages/MainPage.tsx';
import './App.css';
import './css/DefaultAnimation.css';
import './css/DefaultTheme.css';
import SearchPage from './pages/SearchPage.tsx';
import RoulettePage from './pages/RoulettePage.tsx';
import { RouletteProvider } from './contexts/RouletteContext.tsx';

const App: React.FC = () => {
  return <Router>
    <LagnuageProvider>
      <SettingsProvider>
        <AccountProvider>
          <Routes>
            <Route path="/search" element={<SearchPage/>}></Route>
            <Route path="/roulette" element={<RouletteProvider><RoulettePage/></RouletteProvider>}></Route>
            <Route path="/" element={<MainPage/>}></Route>
          </Routes>
        </AccountProvider>
      </SettingsProvider>
    </LagnuageProvider>
  </Router>;
}

export default App;

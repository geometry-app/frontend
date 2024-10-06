import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';
import './defaultTheme.css';
import { LagnuageProvider } from './context/LanguageContext';
import { SettingsProvider } from './context/SettingsProvider';
import { SearchProvider } from './context/SearchContext';
import SearchPage from './pages/SearchPage';
import LockSvg from './svgs/lock.svg';
import MainPage from './pages/MainPage';
import { RouletteProvider } from './context/RouletteContext';
import RoulettePage from './pages/RoulettePage';

const App: React.FC = () => {
  return <Router>
    <LagnuageProvider>
      <SettingsProvider>
          <SearchProvider>
            <Routes>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/roulette" element={<RouletteProvider><RoulettePage /></RouletteProvider>}></Route>
              <Route path="/" element={<MainPage />}></Route>
            </Routes>
          </SearchProvider>
      </SettingsProvider>
    </LagnuageProvider>
  </Router>;
}

export default App;

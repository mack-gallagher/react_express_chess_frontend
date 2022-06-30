import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Routes, Route } from 'react-router-dom';

import App from './components/App';
import Game from './components/Game';
import PlayForm from './components/PlayForm';
import WaitingPage from './components/WaitingPage';

import { BrowserRouter } from 'react-router-dom';

const url = 'https://spx-online-game-server.herokuapp.com'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App /> }>
        <Route exact path='/' element={ <PlayForm url={url} /> } />
        <Route path='game' element={ <Game url={url} /> } />
        <Route path='waiting' element={ <WaitingPage url={url} /> } />
      </Route>
    </Routes>
  </BrowserRouter>
);

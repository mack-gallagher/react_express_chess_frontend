import './index.css';

import React, { useNavigate } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';

import { Routes, Route } from 'react-router-dom';

import App from './components/App';
import Game from './components/Game';
import PlayForm from './components/PlayForm';
import WaitingPage from './components/WaitingPage';
import WinPage from './components/WinPage';

import { BrowserRouter } from 'react-router-dom';

const url = 'http://localhost:9000';

let axios_settings = {
  headers: {
    authorization: localStorage.getItem('token')
  }
};

const dump = async _ => {
  await axios.post(`${url}/api/game/dump`,{},axios_settings);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App /> }>
        <Route exact path='/' element={ <PlayForm url={url} dump={dump} /> } />
        <Route path='game' element={ <Game url={url} dump={dump} /> } />
        <Route path='waiting' element={ <WaitingPage url={url} dump={dump} /> } />
        <Route path='endgame' element={ <WinPage url={url} dump={dump} /> } />
      </Route>
    </Routes>
  </BrowserRouter>
);

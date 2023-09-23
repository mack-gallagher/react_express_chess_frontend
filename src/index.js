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

const game_url = /* 'http://localhost:9000'; */ 'https://react-express-chess-server-46266f819320.herokuapp.com'; 

const igor_url = 'http://localhost:4000';

let axios_settings = {
  headers: {
    authorization: localStorage.getItem('token')
  }
};

const dump = async _ => {
  await axios.post(`${game_url}/api/game/dump`,{},axios_settings);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App /> }>
        <Route exact path='/' element={ <PlayForm game_url={game_url} dump={dump} /> } />
        <Route path='game' element={ <Game game_url={game_url} dump={dump} /> } />
        <Route path='waiting' element={ <WaitingPage game_url={game_url} igor_url={igor_url} dump={dump} /> } />
        <Route path='endgame' element={ <WinPage game_url={game_url} dump={dump} /> } />
      </Route>
    </Routes>
  </BrowserRouter>
);

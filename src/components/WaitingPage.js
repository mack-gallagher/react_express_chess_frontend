import React from 'react';
import axios from 'axios';
import { useInterval } from '../utils';
import { useNavigate } from 'react-router-dom';

function WaitingPage(props) {

  const { game_url, igor_url, dump } = props;

  const navigate = useNavigate();

  let axios_settings = {
    headers: {
      authorization: localStorage.getItem('token')
    }
  };

  const abandon_ship = async _ => {
    await dump();
    navigate('..');
  }

  const alert_igor = async _ => {
    const data = await axios.post(`${igor_url}`,{},{params: {player: 1}},axios_settings);
    console.log(data);
  }

  useInterval(() => {
    axios.get(`${game_url}/api/game`,axios_settings)
      .then(response => {
        if (response.data.num_players === 2) {
          navigate('../game');
        }
      })
      .catch(err => {
        abandon_ship();
      })
  },1000);  
  
  return (
          <div className="waiting-page">
            <h1>Waiting for a Player 2 to join...</h1>
            <button
              onClick={alert_igor}
            >
              Play Machine
            </button>
            <button
              onClick={() => dump().then(response => navigate('..'))}
            >
              Reset and Return To Main Page
            </button>
          </div>
          );
}

export default WaitingPage;

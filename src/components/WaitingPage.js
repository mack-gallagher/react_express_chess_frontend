import React from 'react';
import axios from 'axios';
import useInterval from '../utils';
import { useNavigate } from 'react-router-dom';

function WaitingPage(props) {

  const { url, abandon_ship } = props;

  const navigate = useNavigate();

  let axios_settings = {
    headers: {
      authorization: localStorage.getItem('token')
    }
  };

  useInterval(() => {
    axios.get(`${url}/api/game`,axios_settings)
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
              onClick={() => abandon_ship().then(response => navigate('..'))}
            >
              Reset and Return To Main Page
            </button>
          </div>
          );
}

export default WaitingPage;

import React from 'react';
import axios from 'axios';
import useInterval from '../utils';
import { useNavigate } from 'react-router-dom';

const PORT = 9000;

function WaitingPage() {

  const navigate = useNavigate();

  let axios_settings = {
    headers: {
      authorization: localStorage.getItem('token')
    }
  };


  useInterval(() => {
    axios.get(`http://localhost:${PORT}/api/game`,axios_settings)
      .then(response => {
        if (response.data.num_players === 2) {
          navigate('../game');
        }
      });
  },1000);  
  
  return (<div className="waiting-page">
            <h1>Waiting for a Player 2 to join...</h1>
          </div>);
}

export default WaitingPage;

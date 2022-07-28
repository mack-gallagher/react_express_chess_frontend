import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WinPage(props) {

  const { game_url, abandon_ship } = props; 

  let axios_settings = {
    headers: {
      authorization: localStorage.getItem('token')
    }
  };

  let navigate = useNavigate();

  const [color,set_color] = useState(null);
  const [won,set_won] = useState(null);
  const [history,set_history] = useState([]);

  useEffect(() => {
    axios.get(`${game_url}/api/game/`,axios_settings)
      .then(response => {
        set_color(response.data.color);
        set_won(response.data.won);
        set_history(response.data.history);
      });
  });

  return (
          <div className="win-page">
            <h2>
              { (won===color?"You":(won===1?"White":"Black"))+" win"+(won===color?'':'s')+'!' }
            </h2>
            <h4>Game History:</h4>
            <ul>
              { history.map(x => 
                  <li>x</li>) }
            </ul>
            <button
              onClick={() => abandon_ship().then(response => navigate('..'))}
            >
              Play Again
            </button>
          </div>
          );
};

export default WinPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterval } from '../utils';

import axios from 'axios';

function PlayForm(props) {

  const { game_url, dump } = props;


  useEffect(() => {
    localStorage.removeItem('token');
  },[]);

  const navigate = useNavigate();

  const abandon_ship = async _ => {
    await dump();
    navigate('..');
  }

  const initial_form_values = {
                                player_name: '',
                              };

  const [form_values, set_form_values] = useState(initial_form_values);

  const on_change = evt => {
    set_form_values({ ...form_values, player_name: evt.target.value });
  }

  const on_submit = async (evt) => {
    evt.preventDefault();

    set_form_values(initial_form_values);
    const response = await axios.post(`${game_url}/api/auth`,{});


    localStorage.removeItem('token');
    localStorage.setItem('token',response.data.token);
    console.log('new token:',response.data.token);

    let axios_settings = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };

    const response_2 = await axios.get(`${game_url}/api/game`,axios_settings);

    if (response_2.data.num_players === 1) {
      navigate('./waiting');
    } else {
      navigate('./game');
    }
  }

  return (
    <div 
      className="PlayForm"
    >
      [ The server currently only serves one game at a time, so if nothing happens when you click Play, you may have to reset the game data. ]
      <button 
        onClick={on_submit}
      >
        PLAY
      </button>
      <button
        onClick={abandon_ship}
      >
        Reset Game Data
      </button>
    </div>
         );
};

export default PlayForm;

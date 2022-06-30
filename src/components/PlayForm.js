import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const PORT = 9000;

function PlayForm(props) {

  const { url } = props;

  const navigate = useNavigate();

  const initial_form_values = {
                                player_name: '',
                              };

  const [form_values, set_form_values] = useState(initial_form_values);

  const on_change = evt => {
    set_form_values({ ...form_values, player_name: evt.target.value });
  }

  const on_submit = async (evt) => {
    evt.preventDefault();

    const new_player = {
                          name: form_values.player_name,
                        };

    set_form_values(initial_form_values);
    const response = await axios.post(`${url}/api/auth`,new_player);

    localStorage.setItem('token',response.data.token);

    let axios_settings = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };

    const response_2 = await axios.get(`${url}/api/game`,axios_settings);

    if (response_2.data.num_players === 1) {
      navigate('./waiting');
    } else {
      navigate('./game');
    }
  }

  return (
    <form 
      className="PlayForm"
      onSubmit={on_submit}
    >
      <label>
        Enter your name here:
        <input
          type='text'
          name='player_name'
          value={form_values.player_name}
          onChange={on_change}
        />
      </label>
      <button 
        type='submit'
        disabled={form_values.player_name.length?false:true}
      >
        PLAY
      </button>
    </form>
         );
};

export default PlayForm;

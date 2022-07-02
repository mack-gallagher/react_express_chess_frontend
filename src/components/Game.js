import React, { useState, useEffect } from 'react';
import Board from './Board';
import axios from 'axios';
import useInterval from '../utils';
import { useNavigate } from 'react-router-dom';

function Game(props) {

  const { url, abandon_ship } = props;

  const navigate = useNavigate();

  let axios_settings = {
    headers: {
      authorization: localStorage.getItem('token')
    }
  };

  const initial_board_state = [];
  for (let i = 0; i < 8; i++) {
    initial_board_state.push([]);
    for (let j = 0; j < 8; j++) {
      initial_board_state[i].push({ y: i, x: j, piece: null });
    }
  }

  const [active_div,set_active_div] = useState(null);
  const [board_state,set_board_state] = useState(initial_board_state);
  const [color,set_color] = useState(1);
  const [is_active,set_is_active] = useState(0);
  const [captures,set_captures] = useState([]);

  const white_pieces = ['♔','♕','♗','♖','♘','♙'];
  const black_pieces = ['♚','♛','♝','♜','♞','♟'];

  useEffect(() => {
    axios.get(`${url}/api/game/`,axios_settings)
      .then(response => {
        console.log('initial board state from useEffect:');
        console.log(response.data.board);
        set_board_state(response.data.board);
        console.log('initial board state:');
        console.log(board_state);

        set_color(response.data.color);
      })
      .then(_ => {
        console.log(`my color: ${color}`);
      });
  },[]);


  useInterval(() => {
    axios.get(`${url}/api/game`,axios_settings)
      .then(response => {
        set_color(response.data.color); 
        set_board_state(response.data.board);
        set_is_active(response.data.active?1:0);
        set_captures(response.data.captures.map(x => x.piece));
      })
  }, 1000);

  const activate_piece = async (pos) => {
    const response = await axios.post(`${url}/api/game/activate`,{ pos },axios_settings);
    if (response.status === 200) {
      set_active_div(pos);
    }
  }


  const move_piece = async (pos) => {
    const response = await axios.post(`${url}/api/game/move`,{ start: active_div, destination: pos },axios_settings);
    console.log(response);
    set_active_div(null);
    const board_response = await axios.get(`${url}/api/game/`,axios_settings);
    set_board_state(board_response.data.board);

  }

  const reset_board = async _ => {
    const response = await axios.post(`${url}/api/game/reset`,{},axios_settings);
    set_board_state(response.data.board);
  }

  return (
      <div className="Game">
        <h1>{is_active?'Your turn!':((color-1)?'White':'Black')+"'s turn!"}</h1>
        <Board
          activate_piece={activate_piece}
          move_piece={move_piece}
          board_state={board_state}
          active_div={active_div}
          set_active_div={set_active_div}
          color={color}
          white_pieces={white_pieces}
          black_pieces={black_pieces}
        />
        <p className="header">Captures</p>
        <div className="captures-display">
          { captures }
        </div>
        <button
          onClick={reset_board}
        >
          Reset Board
        </button>
        <button
          onClick={abandon_ship}
        >
          Reset and Return To Main Page
        </button>
      </div>
          );

};

export default Game;

import React, { useState, useEffect } from 'react';
import Board from './Board';
import axios from 'axios';
import { useInterval } from '../utils';
import QueenModal from './QueenModal';
import CastleButton from './CastleButton';
import CapturesDisplay from './CapturesDisplay';
import { useNavigate } from 'react-router-dom';

function Game(props) {

  const { game_url, dump } = props;

  const navigate = useNavigate();

  const abandon_ship = async _ => {
    await dump();
    navigate('..');
  }

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

  const [active_div,set_active_div] = useState([null,null]);
  const [board,set_board] = useState(initial_board_state);
  const [color,set_color] = useState(1);
  const [is_active,set_is_active] = useState(0);
  const [captures,set_captures] = useState([]);
  const [queening,set_queening] = useState(0);
  const [queen_dest,set_queen_dest] = useState([]);
  const [can_castle_kingside,set_can_castle_kingside] = useState(0);
  const [can_castle_queenside,set_can_castle_queenside] = useState(0);
  const [castle_possible_kingside,set_castle_possible_kingside] = useState(1);
  const [castle_possible_queenside,set_castle_possible_queenside] = useState(1);

  const white_pieces = ['♔','♕','♗','♖','♘','♙'];
  const black_pieces = ['♚','♛','♝','♜','♞','♟'];

  useEffect(() => {
    axios.get(`${game_url}/api/game/`,axios_settings)
      .then(response => {
        set_board(response.data.board); 
        set_color(response.data.color);
      })
  },[]);


  useInterval(() => {
    axios.get(`${game_url}/api/game`,axios_settings)
      .then(response => {
        if (response.data.won !== -1) {
          navigate('../endgame');
        }
        set_color(response.data.color); 
        set_board(response.data.board);
        set_is_active(response.data.active?1:0);
        set_captures(response.data.captures.map(x => x.piece));
        set_queening(response.data.queening);
        set_castle_possible_kingside(response.data.castle_possible_kingside);
        set_castle_possible_queenside(response.data.castle_possible_queenside);
        const necessary_kingside_clearances = color===1?
                                                [[7,5],[7,6]]:
                                                [[0,5],[0,6]];
        const necessary_queenside_clearances = color==1?
                                                [[7,1],[7,2],[7,3]]:
                                                [[0,1],[0,2],[0,3]];
        const kingside_clear = necessary_kingside_clearances.reduce((acc,x) => {
          return acc + ((response.data.board[x[0]][x[1]].piece==='')?0:1);
        },0);
        const queenside_clear = necessary_queenside_clearances.reduce((acc,x) => {
          return acc + ((response.data.board[x[0]][x[1]].piece==='')?0:1);
        },0);
        set_can_castle_kingside((response.data.castle_possible_kingside&&kingside_clear===0)?1:0);
        set_can_castle_queenside((response.data.castle_possible_queenside&&queenside_clear===0)?1:0);
        
        console.log('HISTORY:',response.data.history);        

      })
      .catch(err => {
        console.error(err);
        abandon_ship();
      })
  }, 1000);

  const activate_piece = async (pos) => {
    const response = await axios.post(`${game_url}/api/game/activate`,{ pos },axios_settings);
    if (response.status === 200) {
      set_active_div(pos);
    }
  }


  const move_piece = async (pos) => {

    const piece = board[pos[0]][pos[1]].piece;

    try {
      const response = await axios.post(`${game_url}/api/game/move`,{ start: active_div, destination: pos },axios_settings);

      if (response.data.queening) {
        await set_queening(1);
        set_queen_dest(pos);
      } else {
        set_queening(0);
        set_queen_dest(pos);
      }
      set_active_div([null,null]);
      const board_response = await axios.get(`${game_url}/api/game/`,axios_settings);
      set_board(board_response.data.board);

    } catch (err) {
      console.error(err);
    }
  }

  const castle = async (king_or_queen_side) => {
    try {
      await axios.post(`${game_url}/api/game/castle`,{ king_or_queen_side: king_or_queen_side },axios_settings);
    } catch (err) {
      console.error(err);
    }
  }

  const reset_board = async _ => {
    const response = await axios.post(`${game_url}/api/game/reset`,{},axios_settings);
    set_board(response.data.board);
  }

  return (
      <div className="game-vertical">
        <h1
          className="game-header"
        >
          {(is_active?
            (color===1?'Your ':'Your ')
            :(color===1?'Black':'White')+"'s ")+"turn"}
        </h1> 
        <div className="game-horizontal">
          <CapturesDisplay
            color={color}
            white_pieces={white_pieces}
            black_pieces={black_pieces}
            my_or_theirs="theirs"
            captures={captures}
            position="horizontal"
          />
          <div className="Game">
            <CapturesDisplay
              color={color}
              white_pieces={white_pieces}
              black_pieces={black_pieces}
              my_or_theirs="theirs"
              captures={captures}
              position="vertical"
            />
            <QueenModal
              on={queening}
              axios_settings={axios_settings}
              color={color}
              game_url={game_url}
              queen_dest={queen_dest}
            />
            <Board
              active={is_active}
              activate_piece={activate_piece}
              move_piece={move_piece}
              board={board}
              active_div={active_div}
              set_active_div={set_active_div}
              color={color}
              white_pieces={white_pieces}
              black_pieces={black_pieces}
              set_queen_dest={set_queen_dest}
            />
            <div className="castle-button-container">
              <CastleButton
                active={is_active}
                castle={castle}
                color={color}
                castle_possible_kingside={castle_possible_kingside}
                castle_possible_queenside={castle_possible_queenside}
                can_castle_kingside={can_castle_kingside}
                can_castle_queenside={can_castle_queenside}
                side="left"
              />
              <CastleButton
                active={is_active}
                castle={castle}
                color={color}
                castle_possible_kingside={castle_possible_kingside}
                castle_possible_queenside={castle_possible_queenside}
                can_castle_kingside={can_castle_kingside}
                can_castle_queenside={can_castle_queenside}
                side="right"
              />
            </div>
            <CapturesDisplay
              color={color}
              white_pieces={white_pieces}
              black_pieces={black_pieces}
              my_or_theirs="my"
              captures={captures}
              position="vertical"
            />
            <div className="reset-container">
              <button
                className="game-button"
                onClick={reset_board}
              >
                Reset Board
              </button>
              <button
                className="game-button"
                onClick={abandon_ship}
              >
                Reset and Return To Main Page
              </button>
            </div>
          </div>
            <CapturesDisplay
              color={color}
              white_pieces={white_pieces}
              black_pieces={black_pieces}
              my_or_theirs="my"
              captures={captures}
              position="horizontal"
            />
        </div>
      </div>
          );

};

export default Game;

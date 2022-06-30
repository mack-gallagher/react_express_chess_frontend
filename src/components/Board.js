import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from './Row';

function Board(props) {

  const { color, activate_piece, set_active_div, active_div, move_piece, board_state, is_active, white_pieces, black_pieces } = props;
  
  const yxs = [];
  for (let i = 0; i < 8; i++) {
    yxs.push([]);
    for (let j = 0; j < 8; j++) {
      yxs[i].push(j);
    }
  }

  useEffect(() => {
    console.log(`board_state from within board:`);
    console.log(board_state);
  },[]);

  return (
    <div className="Board">
      { color===1?board_state.map((row,idx) =>
          <Row
            activate_piece={activate_piece}
            move_piece={move_piece}
            key={idx}
            y={idx}
            xs={row}
            active_div={active_div}
            set_active_div={set_active_div}
            color={color}
            white_pieces={white_pieces}
            black_pieces={black_pieces}
            is_active={is_active}
          />
       )
       :board_state.map((row,idx) => 
          <Row
            activate_piece={activate_piece}
            move_piece={move_piece}
            key={idx}
            y={idx}
            xs={row}
            active_div={active_div}
            set_active_div={set_active_div}
            color={color}
            white_pieces={white_pieces}
            black_pieces={black_pieces}
            is_active={is_active}
          />
       ).reverse() } 
    </div>
  );
}

export default Board;

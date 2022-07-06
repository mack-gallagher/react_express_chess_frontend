import React from 'react';
import Row from './Row';

function Board(props) {

  const { board,
          color, 
          activate_piece, 
          set_active_div, 
          active_div, 
          move_piece, 
          is_active, 
          white_pieces, 
          black_pieces } = props;
  
  const yxs = [];
  for (let i = 0; i < 8; i++) {
    yxs.push([]);
    for (let j = 0; j < 8; j++) {
      yxs[i].push(j);
    }
  }

  return (
    <div className="Board">
      { color===1?board.map((row,idx) =>
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
       :board.map((row,idx) => 
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

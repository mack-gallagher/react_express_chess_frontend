import React, { useEffect } from 'react';
import Square from './Square';

function Row(props) {

  const { color, activate_piece, set_active_div, active_div, move_piece, y, xs, is_active, white_pieces, black_pieces, set_queen_dest } = props;

  useEffect(() => {
  },[]);

  return (
      <div className={`row y${y}`}>
        { color===1?xs.map((x,idx) =>
            <Square
              activate_piece={activate_piece}
              active_div={active_div}
              set_active_div={set_active_div}
              move_piece={move_piece}
              key={idx}
              y={y} 
              x={idx}
              piece={x.piece}
              white_pieces={white_pieces}
              black_pieces={black_pieces}
              is_active={is_active}
              color={color}
              set_queen_dest={set_queen_dest}
            />
          )
          :xs.map((x,idx) => 
            <Square
              activate_piece={activate_piece}
              active_div={active_div}
              set_active_div={set_active_div} 
              move_piece={move_piece}
              key={idx}
              y={y}
              x={idx}
              piece={x.piece}
              white_pieces={white_pieces}
              black_pieces={black_pieces}
              is_active={is_active}
              color={color}
              set_queen_dest={set_queen_dest}
            />
          ).reverse() }
      </div>
          );

};

export default Row;

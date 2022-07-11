import React from 'react';

function Square(props) {

  const { active, activate_piece, active_div, move_piece, y, x, piece, color, white_pieces, black_pieces, set_queen_dest } = props;

  const my_pieces = [...(color===1?white_pieces:black_pieces)];

  return (
        <div 
          className={`square y${y} x${x} ${(y%2===x%2)?"light":"dark"} 
                      ${(active_div&&(active_div[0]===y&&active_div[1]===x))?'active':''} 
                      ${(active && my_pieces.indexOf(piece) !== -1)?"piece-selectable":""}
                      ${(active && active_div[0])?"possibly-movable":""}` }
          active_div={active_div}
          onClick={(active_div)?(my_pieces.indexOf(piece)!==-1?() => activate_piece([y,x]):() => move_piece([y,x])):() => activate_piece([y,x])}
        >
          { piece }
        </div>
          );
};

export default Square;

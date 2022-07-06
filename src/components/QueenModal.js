import React from 'react';
import QueenPiece from './QueenPiece';
import axios from 'axios';

function QueenModal(props) {

  const { url, on, color, pos, axios_settings, queen_dest } = props;

  const our_pieces = color===1?['♕','♗','♖','♘','♙']:['♛','♝','♜','♞','♟'];

  const select_piece = piece => {
    axios.post(`${url}/api/game/queen/`,{ pos: queen_dest, new_piece: piece },axios_settings);
  }

  return (
        <div className={on?"queen-modal-on":"queen-modal"}>
          <h2>Queen your pawn</h2>
          { our_pieces.map((piece,idx) => 
            <QueenPiece 
              key={idx}
              piece={piece}
              select_piece={select_piece}
            />
            ) } 
        </div>
        );
};

export default QueenModal;

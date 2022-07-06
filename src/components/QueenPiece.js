import React from 'react';

function QueenPiece(props) {

  const { piece, select_piece } = props;

  return (
            <button 
              className="queen-piece-btn"
              onClick={() => select_piece(piece)}
            >
              { piece }
            </button>
          )

};

export default QueenPiece;

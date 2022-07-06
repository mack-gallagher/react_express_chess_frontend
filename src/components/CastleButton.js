import React from 'react';

function CastleButton(props) {

  const { castle,
          side,
          color,
          castle_possible_kingside,
          castle_possible_queenside,
          can_castle_kingside,
          can_castle_queenside
        } = props;

  let king_or_queen_side = color===1?(side==="left"?"queenside":"kingside"):(side==="left"?"kingside":"queenside");

  let on = king_or_queen_side==="kingside"?castle_possible_kingside:castle_possible_queenside;
  let enabled = king_or_queen_side==="kingside"?can_castle_kingside:can_castle_queenside;

  return (
          <button
            className={on?"castle-button-on":"castle-button"}
            disabled={!enabled}
            onClick={() => castle(king_or_queen_side)}
          >
            {`Castle ${king_or_queen_side==="kingside"?"Kingside":"Queenside"}`}
          </button>
          );
}

export default CastleButton;
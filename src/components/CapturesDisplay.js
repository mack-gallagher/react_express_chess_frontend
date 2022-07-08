import React from 'react';

function CapturesDisplay(props) {

  const { captures,
          white_pieces, 
          black_pieces,
          color,
          my_or_theirs,
          position } = props;

  return (
          <div className={"captures-display"+' '+my_or_theirs+' '+position}>
            <p>-</p>
              <div className="captures">
                { (my_or_theirs==="my"?
                    (color===1?
                      captures.filter(x => black_pieces.indexOf(x) !== -1)
                      :captures.filter(x => white_pieces.indexOf(x) !== -1))
                    :(color===1?
                      captures.filter(x => white_pieces.indexOf(x) !== -1)
                      :captures.filter(x => black_pieces.indexOf(x) !== -1)))
                        .map(x => <div className={"capture"+' '+(my_or_theirs==="my"?(color===1?"black":"white"):(color===1?"white":"black"))}>{ x }</div>) }
              </div>
            <p>-</p>
          </div>
          )
}

export default CapturesDisplay;

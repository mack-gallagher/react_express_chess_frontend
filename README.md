# React/Express Chess Frontend

## Description

Client-side application using React and React Router, that allows players to interface with my [react_express_chess_server](https://github.com/mack-gallagher/react_express_chess_server). 

## Status

The chess front-end should currently be bug-free; if you find a bug, please message me on GitHub!

## Usage

To play a game, have a friend open the frontend and separately open your own frontend instance. Then, both of you should click [Play]. After that, you should see a chessboard.

The header above the board will let you know whose turn it is to move. In order to move a piece, click it. Selected pieces will "glow" red. If a piece has no legal moves, you will not be able to select it. Once you have a piece selected, you can de-select it by clicking it again, or you can click any square to move it; if the move is legal, you should see the piece move, and control should transfer to the opposing player; otherwise, nothing will happen.

'Castle buttons' on the lower left and lower right of the board with illustrations of a king and rook switching places will appear and become enabled if you are able to castle; to castle on a side, just click the castle button on that side.

To 'dump' the entire gameboard, ie make the server forget who you are and who your friend was, as well as the game you were playing, click 'Reset and Return to Main Page'.



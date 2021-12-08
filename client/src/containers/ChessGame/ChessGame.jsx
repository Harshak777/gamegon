import React, { useState, useEffect } from 'react';
import Chessboard from "chessboardjsx";
import Chess from "chess.js";
import io  from "socket.io-client";

const [chessGameObject,  setChessGameObject] = useState(new Chess());

useEffect(() => {
    let socketTemp = io("http://localhost:8080");
    function loadSocketIO() {
        socketTemp.on("connect", () => {

        })
    }
    loadSocketIO();
  }, []);

setColor = (ev) => {
    this.setState({ userColor: ev.target.value });
    ev.target.value === "white"
        ? this.setState({ opponentColor: "black" })
        : this.setState({ opponentColor: "white" });

    console.log(
        "Your color: " +
        this.state.userColor +
        "/n" +
        "Opp color: " +
        this.state.opponentColor
    );
}

ValidateMove = ({
    src = this.state.sourceSquare,
    targ = this.state.targetSquare,
}) => {
console.log("move being validated");
if (src !== targ && this.state.chessGameObject.game_over() !== true) {
    this.state.chessGameObject.move({
    from: src,
    to: targ,
    promotion: "q",
    });
    if (this.state.chessGameObject.game_over() !== true) {
    console.log("Fen about to send off");
    this.setState({ currentPositionFen: this.state.chessGameObject.fen() });
    this.SendNewFen(this.state.chessGameObject.fen(), {
        from: this.state.sourceSquare,
        to: this.state.targetSquare,
        promotion: "q",
    });
    } else {
    // the move that was just made ended the game
    console.log("GAME OVER");
    this.setState({ currentPositionFen: this.state.chessGameObject.fen() });
    this.SendNewFen(this.state.chessGameObject.fen(), {
        from: this.state.sourceSquare,
        to: this.state.targetSquare,
        promotion: "q",
    });
    //trigger modal and end game
    }
}
};

SendNewFen = (NewFEN, move) => {
    userSocket.emit("PositionSend", {
        FEN: NewFEN,
        RecipientSocketID: this.state.opponentSocketId,
        move: move,
    });
}

onMouseOverSquare = (sq) => {
    this.setState({ sourceSquare: sq });

};

onDragOverSquare = (sq) => {
    if (this.state.sourceSquare !== sq) {
        this.setState({ targetSquare: sq });
    }
};

const ChessGame = (props) => {

    console.log(props);

    const inGame = false;
    let UserMenu

    if(inGame) {
        UserMenu = (
            <div className="form-container">
              <Chessboard
                position={this.state.currentPositionFen}
                orientation={this.state.userColor}
                onMouseOverSquare={this.onMouseOverSquare}
                onDragOverSquare={this.onDragOverSquare}
                onDrop={this.ValidateMove}
                darkSquareStyle= { {backgroundColor: '#429963' }}
              />
            </div>
          );
          return <div>{UserMenu}</div>;
        } else {
            return (
                <div>Loading</div>
            )
        }
};

export default ChessGame;
import React, { useState, useEffect } from 'react';
import Chessboard from "chessboardjsx";
import Chess from "chess.js";
import io  from "socket.io-client";

const ChessGame = (props) => {

    // const [chessGameObject, setChessGameObject] = useState(new Chess());
    const chessGameObject= new Chess()
    const [inGame, setInGame] = useState(false);
    const [currentPositionFen, setCurrentPositionFen] = useState(null);
    const [userColor, setUserColor] = useState("");
    const [sourceSquare, setSourceSquare] = useState("");
    const [targetSquare, setTargetSquare] = useState("");
    const [socketObject, setSocketObject] = useState(null);
    const [gameId, setGameId] = useState(null);

    useEffect(() => {
        let socketTemp = io("http://localhost:8080");
        function loadSocketIO() {
            socketTemp.on("connect", () => {
                socketTemp.on(gameId, (oppObj) => {
                    console.log("final shake ");
                    setSocketObject(socketTemp);
    
                    setInGame(true);
                    setCurrentPositionFen(this.state.chessGameObject.fen());
                    console.log(inGame)
                    socketTemp.on("NewFenFromServer", (FENobj) => {
                        // checks if the FEN is intended for the recipient
                        if (gameId === FENobj.SocketID) {
                            currentPositionFen(FENobj.FEN);
                            chessGameObject.move(FENobj.move);
                
                          // this means the game has ended
                          if (chessGameObject.game_over() === true) {
                            console.log("GAME OVER");
                            //trigger modal and end the game
                          }
                        }
                      });
    
                      socketTemp.on("NewCurrentPosition", (FENstring) => {
                        currentPositionFen(FENstring);
                      });
                  });
            })
        }
        loadSocketIO();
      }, []);

    const ValidateMove = ({
        src = sourceSquare,
        targ = targetSquare,
    }) => {
    console.log("move being validated");
    if (src !== targ && chessGameObject.game_over() !== true) {
        chessGameObject.move({
        from: src,
        to: targ,
        promotion: "q",
        });
        if (chessGameObject.game_over() !== true) {
        console.log("Fen about to send off");
        setCurrentPositionFen(chessGameObject.fen());
        SendNewFen(chessGameObject.fen(), {
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });
        } else {
        // the move that was just made ended the game
        console.log("GAME OVER");
        setCurrentPositionFen(chessGameObject.fen());
        SendNewFen(chessGameObject.fen(), {
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });
        //trigger modal and end game
        }
    }
    };
    
    const SendNewFen = (NewFEN, move) => {
        socketObject.emit("PositionSend", {
            FEN: NewFEN,
            GameID: gameId,
            move: move,
        });
    }
    
    const onMouseOverSquare = (sq) => {
        setSourceSquare(sq);
    };
    
    const onDragOverSquare = (sq) => {
        if (sourceSquare !== sq) {
            setTargetSquare(sq);
        }
    };
    

    // console.log(props);
    // setUserColor("");
    // setInGame("");
    // setGameId("");
    let UserMenu;

    if(inGame) {
        UserMenu = (
            <div className="form-container">
              <Chessboard
                position={currentPositionFen}
                orientation={userColor}
                onMouseOverSquare={onMouseOverSquare}
                onDragOverSquare={onDragOverSquare}
                onDrop={ValidateMove}
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
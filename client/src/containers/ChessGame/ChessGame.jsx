import React, { useState, useEffect } from 'react';
import Chessboard from "chessboardjsx";
import Chess from "chess.js";
import io  from "socket.io-client";
import Web3 from "web3";
import contract from "../../components/contract";

const ChessGame = (props) => {

    const [chessGameObject, setChessGameObject] = useState(new Chess());
    // const chessGameObject = new Chess();
    const [inGame, setInGame] = useState(false);
    const [currentPositionFen, setCurrentPositionFen] = useState(chessGameObject.fen());
    const [userColor, setUserColor] = useState("");
    const [sourceSquare, setSourceSquare] = useState("");
    const [targetSquare, setTargetSquare] = useState("");
    const [socketObject, setSocketObject] = useState(null);
    const [gameId, setGameId] = useState(null);
    const [account, setAccount] = useState("");

    useEffect(() => {
        let socketTemp = io("http://localhost:8080");

        setUserColor(props.location.state.color);
        setInGame(props.location.state.inGame);
        setGameId(props.location.state.gameId);

        console.log(props.location.state.gameId)
        console.log(gameId)

        function loadSocketIO() {

            socketTemp.on("connect", () => {
                setSocketObject(socketTemp);
                console.log(socketTemp, "inside");
                socketTemp.on(props.location.state.gameId, (oppObj) => {
                    console.log("final shake ", oppObj);
    
                    setInGame(true);

                    // setCurrentPositionFen(chessGameObject.fen());
                    console.log(inGame);

                });
                    socketTemp.on("NewFenFromServer", (FENobj) => {
                        console.log("New FEN received");
                        console.log(gameId, FENobj);
                        if (props.location.state.gameId == FENobj.GameID) {
                            setCurrentPositionFen(FENobj.FEN);
                            chessGameObject.move(FENobj.move);
                            console.log("Move Changed");
                
                          // this means the game has ended
                          if (chessGameObject.game_over() === true) {
                            
                            console.log("GAME OVER");
                            //trigger modal and end the game
                          }
                        }
                      });
    
                      socketTemp.on("NewCurrentPosition", (FENstring) => {
                        setCurrentPositionFen(FENstring);
                      });
                  
            })
        }

        async function loadWeb3 () {
            const web3 = new Web3(Web3.givenProvider);
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            console.log(account);
        }
        loadWeb3();
        loadSocketIO();
      }, []);

      async function resolveBet(betid, challengerWins) {
        const web3 = new Web3(Web3.givenProvider);
        if (contract != null)
          contract.methods
            .resolveBet(betid, challengerWins)
            .send({
              from: account,
              gasLimit: web3.eth.getBlock("latest").gasLimit
            })
            .then((receipt) => {
              console.log(receipt);
            });
      }

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
        console.log("moved");
        if (chessGameObject.game_over() !== true) {
        console.log("Fen about to send off");
        setCurrentPositionFen(chessGameObject.fen());
        // console.log(currentPositionFen);
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

        let winner = null;
        if(props.location.state.color == "white") {
            winner = 1;
        } else {
            winner = 0;
        }

        // resolveBet(props.location.state.betId, winner);
        console.log(resolveBet(props.location.state.betId, winner));
        //trigger modal and end game
        }
    }
    };
    
    const SendNewFen = (NewFEN, move) => {
        console.log("called");
        console.log(NewFEN);
        socketObject.emit("PositionSend", {
            FEN: NewFEN,
            GameID: gameId,
            move: move,
        });
    }
    
    const onMouseOverSquare = (sq) => {
        // console.log(sq);
        setSourceSquare(sq);
    };
    
    const onDragOverSquare = (sq) => {
        console.log(sq, sourceSquare);
        if (sourceSquare !== sq) {
            console.log("inside setting target");
            setTargetSquare(sq);
        }
    };
    

    // console.log(props);

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
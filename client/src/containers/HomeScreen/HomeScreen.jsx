import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import web3 from "../../components/web3";
import contract from "../../components/contract";
import HomeScreenStyles from "./HomeScreenStyles";
import Web3 from "web3";
import io  from "socket.io-client";


const HomeScreen = (props) => {
  const [account, setAccount] = useState("");
  const [isloading, setIsloading] = useState(true);

  const [servername, setserverValue] = useState("");
  const [value, setValue] = useState("");
  const [game, setgame] = useState("");

  const [userSocketId, setUserSocketId]= useState("");


  useEffect(() => {
    //============LOADING ADDRESS=============
    async function loadBlockChain() {
      // console.log(web3);
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      console.log(account);
    }
    loadBlockChain();
  }, []);

  function handlevalueChange(event) {
    setValue(event.target.value);
  }

  function handlegameChange(event) {
    setgame(event.target.value);
  }

  function chessSocket() {
    const socketTemp = io("http://localhost:8080");
    console.log("Out");
    console.log(socketTemp);
    socketTemp.on("connect", () => {
      console.log("inside");
      // initializing the client socket , and setting initial state
      setUserSocketId(socketTemp.id);

      console.log(socketTemp.id);

      // when an opponent enters password and sends game request, and it is received by the host
      socketTemp.on("gameSend", (joinObj) => {
        console.log("message received from " + joinObj.senderId);

        // if the received password matches the host password -> start game
        if (this.state.inGame === false && this.state.password !== "") {
          console.log("message success from " + joinObj.senderId);

          this.setState({ opponentSocketId: joinObj.senderId });
          let newObj = {
            usrId: this.state.userSocketId,
            ownerId: joinObj.senderId,
            recipientColor: this.state.opponentColor,
            opponentColor: this.state.userColor,
          };
          // this sends a final handshake to the person joining the host's game via password

          socketTemp.emit("finalShake", newObj);
          this.setState({ inGame: true }); // renders the chessboard for the host
        }
      });
      socketTemp.on("NewCurrentPosition", (FENstring) => {
        //updates the new current chess position
        this.setState({ currentPositionFen: FENstring });
      });
      socketTemp.on(socketTemp.id, (oppObj) => {
        console.log("final shake ");
        this.setState({ opponentSocketId: oppObj.usrId }); // receives final handshake
        this.setState({ userColor: oppObj.recipientColor });
        this.setState({ opponentColor: oppObj.opponentColor });
        this.setState({ inGame: true });
        this.setState({ currentPositionFen: this.state.chessGameObject.fen() });
      });

      // when a new fen is received, (that is validated by the sender) : update the recipient fen
      socketTemp.on("NewFenFromServer", (FENobj) => {
        // checks if the FEN is intended for the recipient
        if (this.state.userSocketId === FENobj.RecipientSocketID) {
          this.setState({
            currentPositionFen: FENobj.FEN,
          });
          this.state.chessGameObject.move(FENobj.move);

          // this means the game has ended
          if (this.state.chessGameObject.game_over() === true) {
            console.log("GAME OVER");
            //trigger modal and end the game
          }
        }
      });
    });
  }

  const history = useHistory();
  const classes = HomeScreenStyles();
  //===============================================PUBLISH BET=================================
  async function publishBet() {

    chessSocket();

    console.log("came");
    console.log(userSocketId);

    const web3 = new Web3(Web3.givenProvider);
    console.log(contract);
    contract.methods
      .publishBet(userSocketId, game)
      .send({
        from: account,
        gasLimit: web3.eth.getBlock("latest").gasLimit,
        value: web3.utils.toWei(value, "ether"),
      })
      .then((receipt) => {
        console.log(receipt);
        history.push("/chessGame", {inGame: false, color: "white"});
      });
  }

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <h1>Your Account {account}</h1>
        </Grid>
        <Grid item>
          <TextField
            required
            id="outlined-required"
            label="Game Name"
            value={game}
            onChange={handlegameChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="filled-number"
            label="Bet amount"
            type="number"
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            value={value}
            onChange={handlevalueChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" size="medium" onClick={publishBet}>
            CREATE NEW GAME
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              history.push("/join");
            }}
          >
            JOIN GAME
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeScreen;

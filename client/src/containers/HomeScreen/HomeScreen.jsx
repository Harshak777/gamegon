import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import getWeb3 from "../../components/web3";
import contract from "../../components/contract";
import HomeScreenStyles from "./HomeScreenStyles";
// import Web3 from "web3";
import io  from "socket.io-client";

const HomeScreen = (props) => {
  const [account, setAccount] = useState("");
  const [isloading, setIsloading] = useState(true);
  const web3 = useRef(null);

  const [servername, setserverValue] = useState("");
  const [value, setValue] = useState("");
  const [game, setgame] = useState("");

  const [userSocketId, setUserSocketId]= useState("");
  const [loadingWeb3, setLoadingWeb3] = useState(true);


  useEffect(async () => {
    //============LOADING ADDRESS=============
    async function loadWeb3 () {
      web3.current = await getWeb3();
      // setWeb3(web3);
      const accounts = await web3.current.eth.getAccounts();
      setAccount(accounts[0]);
      console.log(account);
    }

    loadWeb3();
    chessSocket();
  }, []);

  // useEffect(() => {
  //   console.log("inside", web3)
  //   setLoadingWeb3(true);
  // }, [web3]);

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
    });
  }

  const history = useHistory();
  const classes = HomeScreenStyles();
  //===============================================PUBLISH BET=================================
  async function publishBet() {

    console.log("came");
    console.log(userSocketId);

    // const web3 = new Web3(Web3.givenProvider);
    console.log(contract);
    contract.methods
      .publishBet(userSocketId, game)
      .send({
        from: account,
        gasLimit: web3.current.eth.getBlock("latest").gasLimit,
        value: web3.current.utils.toWei(value, "ether"),
      })
      .then((receipt) => {
        console.log(receipt);
        history.push({pathname: "/chessGame", state: {inGame: false, color: "white", gameId: userSocketId, betId: receipt.events.LogPublishBet.returnValues._id}});
      });
  }

  
    if(loadingWeb3) {
      console.log(web3.current);
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
            {/* <Button
              variant="outlined"
              size="medium"
              onClick={connectWeb3}
            >
              Connect Metamask
            </Button> */}
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
    } else {
      return (
      <h1>loading web3</h1>
      );
    }
};

export default HomeScreen;
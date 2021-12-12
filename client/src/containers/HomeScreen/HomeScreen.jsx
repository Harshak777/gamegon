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
import io from "socket.io-client";
import getWeb3 from "../../components/web3";

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from "../../components/Header";
import MainFeaturedPost from "../../components/MainFeaturedPost";
import Livegame from "../../components/Livegame";
import Paper from '@mui/material/Paper';
import { Typography } from "@material-ui/core";

import Stack from '@mui/material/Stack';



const HomeScreen = (props) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [isloading, setIsloading] = useState(true);

  const [servername, setserverValue] = useState("");
  const [value, setValue] = useState("");
  const [game, setgame] = useState("");
  const [Tab, setTab] = useState('1');
  const [userSocketId, setUserSocketId] = useState("");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };



  useEffect(() => {
    //============LOADING ADDRESS=============
    async function loadBlockChain() {
      // console.log(web3);
      // const web3 = new Web3(Web3.givenProvider);
      // const accounts = await web3.eth.getAccounts();
      // setAccount(accounts[0]);
      getWeb3().then((result) => {
        const web3 = result;
        web3.eth.getAccounts().then((accounts) => {
          setAccount(accounts[0]);
          web3.eth.getBalance(accounts[0], (err, balance) => {
            setBalance( web3.utils.fromWei(balance, "ether") + " MATIC")
          });
        }); 
      // we instantiate our contract next
      });
      chessSocket();
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
    const socketTemp = io("https://dry-coast-44669.herokuapp.com/");
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

  //===============================================PUBLISH BET=================================
  async function publishBet() {
    console.log("came");
    console.log(userSocketId);
    if(game != "" && value!= ""){
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
        history.push({
          pathname: "/chessGame",
          state: {
            inGame: false,
            color: "white",
            gameId: userSocketId,
            betId: receipt.events.LogPublishBet.returnValues._id,
          },
        });
      });
    }
    else{
      alert("Please the input")
    }
  }


  //=========================style========================
  const theme = createTheme();


  return (
    
    <ThemeProvider theme={theme}>
       <CssBaseline />
       <Container maxWidth="lg">
       <Header title="GAMEGON" />
       <main>
       <MainFeaturedPost post={mainFeaturedPost} />
       {/* <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
     <Stack spacing={2} direction="row">
     <Button variant="contained">Contained</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
          </Grid> */}
<Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      ><Grid item>

         <Typography component="h5" variant="h4" color="primary" >
     Create  Game
    </Typography>
    </Grid>
        <Grid item>
          <h4> Account: {account.substr(0,6)+"...."+account.substr(36,42)}  /   Balance: {balance.substr(0,5)+" MATIC"} </h4>
        </Grid>
        <Grid item>
          <TextField
            required
            id="outlined-required"
            label="Game Name"
            value={game}
            required
            onChange={handlegameChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="filled-number"
            label="Stake amount"
            type="number"
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            value={value}
            onChange={handlevalueChange}
            required
          />
        </Grid>
        <Grid item>
          <Button variant="contained" size="medium" onClick={publishBet}>
            CREATE NEW GAME
          </Button>
        </Grid>
      
        {/* <Grid item>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              history.push("/join");
            }}
          >
            JOIN GAME
          </Button>
        </Grid> */}
      </Grid>
      </Paper>
      <br/>
      <Grid item xs={12}  >
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Livegame />
                </Paper>
              </Grid>
      </main>
    </Container>
    </ThemeProvider>
  );
};

export default HomeScreen;

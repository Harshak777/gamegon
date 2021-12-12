import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import HomeScreen from "./containers/HomeScreen";
import Box from "@material-ui/core/Box";
import Livegame from "./components/Livegame";
import ChessGame from "./containers/ChessGame";
import Loadingpage from "./components/Loadingpage";
import WinnerPage from "./components/winnerpage";
import LoserPage from "./components/loserpage";
import Web3 from "web3";
import getWeb3 from "./components/web3";

const App = () => {
  const [account, setAccount] = useState("");
  const [isloading, setIsloading] = useState(true);
  const [isloadingaccount, setIsloadingaccount] = useState(true);
  const [contract, setContract] = useState(null);

  // useEffect(() => {
  //   //============LOADING ADDRESs=============
    
  //   // loadBlockChain();
  //   console.log(window.web3);
  //   if(window.web3 && window.web3.proxy && window.web3.proxy['<target>'].currentProvider['<target>'].selectedAddress != null) {
  //     setIsloading(false);
  //   }
  // }, [window.web3]);

  // useEffect(() => {
  //   async function loadBlockChain() {
  //     getWeb3().then((result) => {
  //       const web3 = result;
  //       web3.eth.getAccounts().then((accounts) => {
  //         setAccount(accounts[0]);
  //         setIsloading(false);
  //       }); // we instantiate our contract next
  //     });
  //   }
  //   loadBlockChain();
  // }, [isloading])


  //=========================================Getting BET Detail============================
  async function getbetdetail(betid) {
    //put bet id
    if (contract != null)
      contract.methods
        .bets(betid)
        .call()
        .then(
          (result) => {
            console.log(result);
          }
          // do stuff with returned values
        );
  }

  // if (isloading) return <h1>loading</h1>;
  // else
    return (
      <Box
      sx={{
        minHeight: "100vh",
        background:
          "url(https://academy.binance.com/_next/image?url=https%3A%2F%2Fimage.binance.vision%2Fuploads-original%2F4ae6b499dfd3459592e79b822323259c.png&w=750&q=80) no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Router>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/notwinner" component={LoserPage} />
          <Route path="/winner" component={WinnerPage} />
          <Route path="/chessGame" component={ChessGame} />
        </Router>
      </div>
      </Box>
    );
};

export default App;

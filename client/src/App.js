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
  const [contract, setContract] = useState(null);

  useEffect(() => {
    //============LOADING ADDRESs=============
    async function loadBlockChain() {
      getWeb3().then((result) => {
        const web3 = result;
        web3.eth.getAccounts().then((accounts) => {
          setAccount(accounts[0]);
        }); // we instantiate our contract next
      });
    }
    loadBlockChain();

    //===============Loading Contract=====================
    async function loadContract() {
      // console.log(web3);
      const address = "0x851C0f6078B81E0ec2Da4eCC9ca7F2f5F0296664";
      const abi = [
        {
          constant: false,
          inputs: [],
          name: "terminate",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          name: "bets",
          outputs: [
            {
              name: "id",
              type: "uint256",
            },
            {
              name: "challenger",
              type: "address",
            },
            {
              name: "accepter",
              type: "address",
            },
            {
              name: "name",
              type: "string",
            },
            {
              name: "conditions",
              type: "string",
            },
            {
              name: "price",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_id",
              type: "uint256",
            },
          ],
          name: "acceptBet",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "getAvailableBets",
          outputs: [
            {
              name: "",
              type: "uint256[]",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_id",
              type: "uint256",
            },
            {
              name: "challengerWins",
              type: "bool",
            },
          ],
          name: "resolveBet",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "getNumberOfBets",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_name",
              type: "string",
            },
            {
              name: "_conditions",
              type: "string",
            },
          ],
          name: "publishBet",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          payable: true,
          stateMutability: "payable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "_id",
              type: "uint256",
            },
            {
              indexed: true,
              name: "_challenger",
              type: "address",
            },
            {
              indexed: false,
              name: "_name",
              type: "string",
            },
            {
              indexed: false,
              name: "_price",
              type: "uint256",
            },
          ],
          name: "LogPublishBet",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "_id",
              type: "uint256",
            },
            {
              indexed: true,
              name: "_challenger",
              type: "address",
            },
            {
              indexed: true,
              name: "_accepter",
              type: "address",
            },
            {
              indexed: false,
              name: "_name",
              type: "string",
            },
            {
              indexed: false,
              name: "_price",
              type: "uint256",
            },
          ],
          name: "LogAcceptBet",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "_id",
              type: "uint256",
            },
            {
              indexed: true,
              name: "_challenger",
              type: "address",
            },
            {
              indexed: true,
              name: "_accepter",
              type: "address",
            },
            {
              indexed: false,
              name: "_name",
              type: "string",
            },
            {
              indexed: false,
              name: "_payout",
              type: "uint256",
            },
          ],
          name: "LogResolveBet",
          type: "event",
        },
      ];
      const web3 = new Web3(Web3.givenProvider);
      const myContractInstance = new web3.eth.Contract(abi, address);
      setContract(myContractInstance);

      setIsloading(false);
    }
    loadContract();
  }, []);
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

  if (isloading) return <h1>loading</h1>;
  else
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

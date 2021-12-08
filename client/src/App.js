import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import HomeScreen from "./containers/HomeScreen";
import GamesArena from "./containers/GamesArena";
import Livegame from "./components/Livegame";

import Web3 from "web3";

const App = () => {
  const [account, setAccount] = useState("");
  const [isloading, setIsloading] = useState(true);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    //============LOADING ADDRESs=============
    async function loadBlockChain() {
      // console.log(web3);
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      console.log(account);
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

  //   getbetdetail(3);

  //====================ResolveBet==============================
  async function resolveBet(betid, challengerWins) {
    const web3 = new Web3(Web3.givenProvider);
    if (contract != null)
      contract.methods
        .resolveBet("3", "1")
        .send({
          from: account,
          gasPrice: 10000000,
        })
        .then((receipt) => {
          console.log(receipt);
        });
  }

  if (isloading) return <h1>loading</h1>;
  else
    return (
      <div>
        <Router>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/join" component={Livegame} />
        </Router>
      </div>
    );
};

export default App;

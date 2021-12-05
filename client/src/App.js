import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

import HomeScreen from "./containers/HomeScreen";
import GamesArena from "./containers/GamesArena";

import Web3 from 'web3';

const App = () => {

    const [account, setAccount] = useState("");

    async function loadBlockChain() {
        // console.log(web3);
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    }

    useEffect(() => loadBlockChain, []);

    return (
        <div>
            <Router>
                <Route exact path="/" component={HomeScreen} account={account} />
                <Route path="/join" component={GamesArena} />
            </Router>
        </div>
    );
};

export default App;
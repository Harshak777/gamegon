import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

import HomeScreen from "./containers/HomeScreen";
import GamesArena from "./containers/GamesArena";

const App = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={HomeScreen} />
                <Route path="/join" component={GamesArena} />
            </Router>
        </div>
    );
};

export default App;
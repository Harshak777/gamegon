import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

const App = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={() => {return (<p>Hello</p>)}} />
                {/* <Route path="/create" component={} />
                <Route path="/join" component={} /> */}
            </Router>
        </div>
    );
};

export default App;
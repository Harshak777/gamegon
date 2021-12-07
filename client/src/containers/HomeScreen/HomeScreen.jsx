import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useHistory } from "react-router-dom";
// import web3 from '../../components/web3';
import Web3 from 'web3';

import HomeScreenStyles from './HomeScreenStyles';

const HomeScreen = (props) => {
    
    console.log(props)

    const history = useHistory();
    const classes = HomeScreenStyles();
    return (
        <Container>
            <Grid container direction="column"
                justifyContent="space-evenly"
                alignItems="center" spacing={2}>
                <Grid item>
                    <h1>Your Account {props.account}</h1>
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="outlined-required"
                        label="Game Name"
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
                        defaultValue={1}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" size="medium">
                        CREATE NEW GAME
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" size="medium" onClick={() => {history.push('/join')}}>
                        JOIN GAME
                    </Button>

                </Grid>
            </Grid>
        </Container>
    );
};

export default HomeScreen;
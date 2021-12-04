import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import GameArenaStyles from "./GamesArenaStyles";
import GamesList from "../../components/GamesList";

const GamesArena = () => {
    const classes = GameArenaStyles();
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignContents: 'center',
                '& > :not(style)': {
                m: 1,
                width: 400,
                height: 400,
                },
                backgroundColor: 'red',
            }}
        >
            <Paper elevation={3}>
                <GamesList name="Chess" />
            </Paper>
            <Paper elevation={3}>
                <GamesList name="Rock-Paper-Scissor" />
            </Paper>
        </Box>
    );
};

export default GamesArena;
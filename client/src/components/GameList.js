import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GameCard from "./GameCard";

function GameList() {
    const [games, setGames] = useState([])

    useEffect(() => {
        fetch('/games')
        .then(r => r.json())
        .then(games => setGames(games.slice(0, 20)))
    }, [])

    return (
        <Container sx={{marginTop: '3%'}}>
            <Paper sx={{textAlign: 'center', color: '#e0e0e0'}}>
                <Grid container spacing={2} >
                    {games.map(game => {
                        return (
                            <Grid item key={game.id} >
                                <GameCard game={game} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>
        </Container>
    )
}

export default GameList
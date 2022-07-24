import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GameCard from "./GameCard";
import PageButtons from "./PageButtons";

function GameList() {
    const [games, setGames] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState({
        start: 0,
        end: 18
    })

    useEffect(() => {
        fetch('/games')
        .then(r => r.json())
        .then(games => {
            setPageCount(Math.ceil(games.length / 18))
            setGames(games)
        })
    }, [])

    return (
        <Container sx={{marginTop: '3%'}}>
            <Paper sx={{textAlign: 'center', color: '#e0e0e0'}}>
                <Grid container spacing={2} >
                    {games.slice(page.start, page.end).map(game => {
                        return (
                            <Grid item key={game.id} >
                                <GameCard game={game} />
                            </Grid>
                        )
                    })}
                </Grid>
                <PageButtons pageCount={pageCount} setPage={setPage} />
            </Paper>
        </Container>
    )
}

export default GameList
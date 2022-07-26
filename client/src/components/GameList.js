import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GameCard from "./GameCard";
import PageButtons from "./PageButtons";

function GameList({ games }) {
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setPage] = useState(1)
    const [listedGames, setList] = useState([])

    const pageNum = useParams().page

    const start = (pageNum - 1) * 18
    const end = start + 18

    useEffect(() => {
        setPageCount(Math.ceil(games.length / 18))
        setPage(parseInt(pageNum, 10))
        setList(games.slice(start, end))
    }, [pageNum, games.length])

    if (!games) return null


    return (
        <Container sx={{marginTop: '3%'}}>
            <Paper sx={{textAlign: 'center', color: '#e0e0e0'}}>
                <Grid container spacing={2} >
                    {listedGames.map(game => {
                        return (
                            <Grid item key={game.id} >
                                <GameCard game={game} gameObj={{games: listedGames, setGames: setList}} />
                            </Grid>
                        )
                    })}
                </Grid>
                <PageButtons pageCount={pageCount} currentPage={currentPage} />
            </Paper>
        </Container>
    )
}

export default GameList
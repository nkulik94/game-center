import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GameCard from "./GameCard";
import LinkPageButtons from "./LinkPageButtons";
import SimplePageButtons from "./SimplePageButtons";

function GameList({ games, isMainList = true }) {
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setPage] = useState(1)
    const [listedGames, setList] = useState([])
    const params = useParams()

    let pageNum
    let start
    let end

    if (isMainList) {
        pageNum = params.page
        start = (pageNum - 1) * 18
        end = start + 18
    }

    useEffect(() => {
        setPageCount(Math.ceil(games.length / 18))
        if (isMainList) {
            setPage(parseInt(pageNum, 10))
            setList(games.slice(start, end))
        } else {
            setList(games.slice(0, 18))
        }
    }, [pageNum, games])

    if (!games) return null

    const pageBtns = isMainList ? <LinkPageButtons pageCount={pageCount} currentPage={currentPage} /> : <SimplePageButtons setList={setList} games={games} count={pageCount} />
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
                {pageBtns}
            </Paper>
        </Container>
    )
}

export default GameList
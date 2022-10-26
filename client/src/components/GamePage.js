import React, { useState, useContext, useEffect } from "react";
import { GamesContext } from "../context/games";
import GameList from "./GameList";
import Container from '@mui/material/Container';

function GamePage() {
    const gameContext = useContext(GamesContext)
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(null)
    const [activePage, setActive] = useState(1)

    useEffect(() => {
        const url = page ? `/games?page=${page}` : '/games'
        fetch(url)
            .then(r => r.json())
            .then(({ page_count, games, active_page }) => {
                gameContext.setGames(games)
                setPageCount(page_count)
                setActive(active_page)
            })
    }, [page])

    return (
        <Container sx={{marginTop: '3%'}}>
            <GameList games={gameContext.games} totalPages={pageCount} setPage={setPage} page={activePage} />
        </Container>
    )
}

export default GamePage
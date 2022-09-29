import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GamesContext } from "../context/games";
import GameList from "./GameList";
import Container from '@mui/material/Container';

function GamePage() {
    const params = useParams()
    const gameContext = useContext(GamesContext)
    const [searched, setSearched] = useState('')
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        fetch(`/games?page=${params.page}`)
            .then(r => r.json())
            .then(({ page_count, games }) => {
                gameContext.setGames(games)
                setPageCount(page_count)
            })
    }, [params.page])
    

    //const filteredGames = games.filter(game => game.title.toUpperCase().includes(searched.toUpperCase()))

    return (
        <Container sx={{marginTop: '3%'}}>
            <GameList games={gameContext.games} searched={searched} setSearched={setSearched} params={params} totalPages={pageCount} />
        </Container>
    )
}

export default GamePage
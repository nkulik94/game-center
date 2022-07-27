import React, { useState, useEffect, useContext } from "react";
import { GamesContext } from "../context/games";
import GameList from "./GameList";
import Container from '@mui/material/Container';

function GamePage() {
    const games = useContext(GamesContext).games
    const [searched, setSearched] = useState('')
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        //if (games) {
            const filteredGames = games.filter(game => game.title.toUpperCase().includes(searched.toUpperCase()))
            setFiltered(filteredGames)
        //}
    }, [searched, games])

    return (
        <Container sx={{marginTop: '3%'}}>
            <GameList games={filtered} searched={searched} setSearched={setSearched} />
        </Container>
    )
}

export default GamePage
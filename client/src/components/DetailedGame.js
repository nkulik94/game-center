import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function DetailedGame() {
    const id = useParams().gameId
    const [game, setGame] = useState(null)

    useEffect(() => {
        fetch(`/games/${id}`)
            .then(r => r.json())
            .then(setGame)
    }, [id])
    
    if (!game) return null

    return (
        <h1>{game.title}</h1>
    )
}

export default DetailedGame
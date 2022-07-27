import React, { useState, useEffect } from "react";

const GamesContext = React.createContext()

function GamesProvider({ children }) {
    const [games, setGames] = useState([])

    useEffect(() => {
        fetch('/games')
            .then(r => r.json())
            .then(setGames)
    }, [])

    const gamesObj = {
        games,
        setGames
    }

    return <GamesContext.Provider value={gamesObj}>{children}</GamesContext.Provider>;
}

export { GamesContext, GamesProvider }
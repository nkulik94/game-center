import React, { useState, useEffect } from "react";

const GamesContext = React.createContext()

function GamesProvider({ children }) {
    const [games, setGames] = useState([])
    const [pageCount, setPageCount] = useState(0)

    const gamesObj = {
        games,
        setGames
    }
    console.log(games[0])

    return <GamesContext.Provider value={gamesObj}>{children}</GamesContext.Provider>;
}

export { GamesContext, GamesProvider }
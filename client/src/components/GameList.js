import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GameCard from "./GameCard";
import SimplePageButtons from "./SimplePageButtons";
import SearchBar from "./SearchBar";
import PageButtons from "./PageButtons";
//import AdvancedSearch from "./AdvancedSearch";

function GameList({ games, isMainList = true, searched, setSearched, page, totalPages, setPage }) {
    const [pageCount, setPageCount] = useState(0)
    const [listedGames, setList] = useState([])


    useEffect(() => {
        if (games) {
            if (!isMainList) {
                setPageCount(Math.ceil(games.length / 18))
                setList(games.slice(0, 18))
            } else {
                setList(games)
            }
        }
    }, [games])

    if (!games) return null

    // <LinkPageButtons pageCount={totalPages} currentPage={parseInt(params.page, 10)} params={list} />

    const pageBtns = isMainList ? <PageButtons count={totalPages} setPage={setPage} page={page} /> : <SimplePageButtons setList={setList} listItems={games} count={pageCount} />
    return (
        <Paper sx={{textAlign: 'center', color: '#e0e0e0'}}>
            {isMainList ? null : <SearchBar searched={searched} setSearched={setSearched} />}
            <Grid sx={{width: 'fit-content', margin: 'auto'}} container spacing={2} >
                {listedGames.map(game => {
                        return (
                        <Grid sx={{width: 'fit-content', margin: 'auto'}} item key={game.id} >
                            <GameCard game={game} />
                        </Grid>
                    )
                })}
            </Grid>
            {pageBtns}
        </Paper>
    )
}

export default GameList
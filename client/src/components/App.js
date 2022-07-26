import React, { useEffect, useContext, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import { UserContext } from "../context/user";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import NavAppBar from "./NavAppBar";
import GameList from "./GameList";
import CssBaseline from '@mui/material/CssBaseline';
import DetailedGame from "./DetailedGame";

function App() {
    const [games, setGames] = useState([])
    const getMe = useContext(UserContext).getMe


    useEffect(() => {
        fetch('/games')
            .then(r => r.json())
            .then(setGames)
        getMe()
    }, [])

    return (
        <>
            <CssBaseline />
            <NavAppBar />
            <Switch>
                <Route exact path="/">
                    <div></div>
                </Route>
                <Route exact path="/game-list/pages/:page">
                    <GameList games={games} />
                </Route>
                <Route path={`/game-list/:gameId`}>
                    <DetailedGame gameObj={{games, setGames}} />
                </Route>
                <Route path="/profile">
                    <ProfilePage />
                </Route>
                <Route path="/sign-in">
                    <SignIn />
                </Route>
                <Route path="/create-account">
                    <SignUp />
                </Route>
            </Switch>
            </>
    )
}

export default App
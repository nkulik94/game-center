import React, { useEffect, useContext, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import { UserContext } from "../context/user";
import { GamesContext } from "../context/games";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import NavAppBar from "./NavAppBar";
import GamePage from "./GamePage";
import Home from "./Home";
import CssBaseline from '@mui/material/CssBaseline';
import DetailedGame from "./DetailedGame";

function App() {
    //const [games, setGames] = useState([])
    const getMe = useContext(UserContext).getMe

    // const games = useContext(GamesContext).games
    // const setGames = useContext(GamesContext).setGames


    useEffect(getMe, [])

    return (
        <>
            <CssBaseline />
            <NavAppBar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/game-list/:page">
                    <GamePage />
                </Route>
                <Route path={`/game-details/:gameId`}>
                    <DetailedGame />
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
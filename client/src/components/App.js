import React, { useEffect, useContext } from "react";
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
    const getMe = useContext(UserContext).getMe


    useEffect(() => getMe(), [])

    return (
        <>
            <CssBaseline />
            <NavAppBar />
            <Switch>
                <Route exact path="/">
                    <div></div>
                </Route>
                <Route exact path="/game-list">
                    <GameList />
                </Route>
                <Route path={`/game-list/:gameId`}>
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
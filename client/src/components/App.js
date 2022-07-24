import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import NavAppBar from "./NavAppBar";
import GameList from "./GameList";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("/me")
        .then(res => {
            if (res.ok) {
                res.json().then(user => setUser(user))
            }
        })
    }, [])

    return (
        <>
        <CssBaseline />
        <NavAppBar user={user} setLoggedIn={setUser} />
        <Switch>
            <Route exact path="/">
                <div></div>
            </Route>
            <Route path="/game-list">
                <GameList />
            </Route>
            <Route path="/profile">
                <ProfilePage profile={user} />
            </Route>
            <Route path="/sign-in">
                <SignIn setLoggedIn={setUser} />
            </Route>
            <Route path="/create-account">
                <SignUp setLoggedIn={setUser} />
            </Route>
        </Switch>
        </>
    )
}

export default App
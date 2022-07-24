import React, { useEffect, useState, useContext } from "react";
import { Route, Switch } from 'react-router-dom';
import { UserContext } from "../context/user";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import NavAppBar from "./NavAppBar";
import GameList from "./GameList";
import CssBaseline from '@mui/material/CssBaseline';
import DetailedGame from "./DetailedGame";
//import { UserProvider } from '../context/user';

function App() {
    //const [user, setUser] = useState(null)
    const user = useContext(UserContext).user
    const setUser = useContext(UserContext).setUser


    useEffect(() => {
        fetch("/me")
        .then(res => {
            if (res.ok) {
                res.json().then(user => setUser(user))
            }
        })
    }, [])

    return (
        //<UserProvider>
        <>
            <CssBaseline />
            <NavAppBar user={user} setLoggedIn={setUser} />
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
        //</UserProvider>
    )
}

export default App
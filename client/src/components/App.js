import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NavAppBar from "./NavAppBar";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        fetch("/me")
        .then(res => {
            if (res.ok) {
                res.json().then(() => setLoggedIn(true))
            }
        })
    }, [])

    return (
        <>
        <CssBaseline />
        <NavAppBar loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
            <Route exact path="/">
                <div></div>
            </Route>
            <Route path="/sign-in">
                <SignIn setLoggedIn={setLoggedIn} />
            </Route>
            <Route path="/create-account">
                <SignUp setLoggedIn={setLoggedIn} />
            </Route>
        </Switch>
        </>
    )
}

export default App
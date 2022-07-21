import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom'
import SignIn from "./SignIn";
import Logout from "./Logout";
import SignUp from "./SignUp";

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

    //return isLoggedIn ? <Logout setLoggedIn={setLoggedIn} /> : <SignIn setLoggedIn={setLoggedIn} />
    return (
        <Switch>
            <Route path="/sign-in">
                {isLoggedIn ? <Logout setLoggedIn={setLoggedIn} /> : <SignIn setLoggedIn={setLoggedIn} />}
            </Route>
            <Route path="/create-account">
                <SignUp setLoggedIn={setLoggedIn} />
            </Route>
        </Switch>
    )
}

export default App
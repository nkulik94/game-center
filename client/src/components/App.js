import React, { useEffect } from "react";
import SignIn from "./SignIn";

function App() {

    useEffect(() => {
        fetch("/me")
        .then(res => {
            if (res.ok) {
                res.json().then(console.log)
            }
        })
    }, [])

    return <SignIn />
}

export default App
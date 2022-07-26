import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    function getMe() {
        fetch("/me")
        .then(res => {
            if (res.ok) {
                res.json().then(user => {
                    setUser(user)
                    //console.log(user)
                })
            }
        })
    }
    const currentUser = {
        user,
        setUser,
        getMe
    }

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
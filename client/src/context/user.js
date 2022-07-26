import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [likedGames, setLikes] = useState(null)
    const [profile, setProfile] = useState(null)
    const [likedIds, setId] = useState({})

    function getMe() {
        fetch("/me")
        .then(res => {
            if (res.ok) {
                res.json().then(user => {
                    setLikes(user.liked_games)
                    const newProfile = {}
                    Object.keys(user).forEach(key => {
                        if (!Array.isArray(user[key])) {
                            newProfile[key] = user[key]
                        }
                    })
                    setProfile(newProfile)
                    const ids = {}
                    user.liked_games.map(game => ids[game.id] = game.id)
                    setId(ids)
                })
            }
        })
    }
    const currentUser = {
        user: profile,
        setUser: setProfile,
        getMe,
        likedGames,
        setLikes,
        setId,
        likedIds
    }

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
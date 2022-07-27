import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [likedGames, setLikes] = useState(null)
    const [profile, setProfile] = useState(null)
    const [likedIds, setId] = useState({})
    const [ratedGames, setRates] = useState(null)
    const [ratedIds, setRateId] = useState(null)

    function setUpUser(user) {
        console.log(user)
        setLikes(user.liked_games)
        setRates(user.ratedGames)
        const newProfile = {}
        Object.keys(user).forEach(key => {
            if (!Array.isArray(user[key])) {
                newProfile[key] = user[key]
            }
        })
        setProfile(newProfile)
        const likedIdObj = {}
        user.liked_games.map(game => likedIdObj[game.id] = game.id)
        setId(likedIdObj)
        const rateIdObj = {}

    }

    function signOut() {
        setProfile(null)
        setLikes(null)
        setId({})
    }

    function getMe() {
        fetch("/me")
        .then(res => {
            if (res.ok) {
                res.json().then(setUpUser)
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
        likedIds,
        setUpUser,
        signOut
    }

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
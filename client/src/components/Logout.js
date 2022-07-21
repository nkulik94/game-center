import React from 'react';
import Button from '@mui/material/Button';

function Logout({ setLoggedIn }) {
    function handleLogOut() {
        fetch('/logout', {method: 'DELETE'})
        .then(() => setLoggedIn(false))
    }
    return (
        <Button variant="contained" color="error" onClick={handleLogOut} >
            Sign Out
        </Button>
    )
}

export default Logout
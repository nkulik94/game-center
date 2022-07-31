import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { GamesContext } from '../context/games';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

function DeleteAccount() {
    const gamesContext = useContext(GamesContext)
    const userContext = useContext(UserContext)
    const [open, setOpen] = useState(false)

    function handleDeleteAccount() {
        fetch(`/users/${userContext.user.id}`, {method: 'DELETE'})
        .then(r => {
            if (r.ok) {
                setOpen(false)
                userContext.signOut()
                gamesContext.getAndSetGames()
            }
        })
    }

    return (
        <>
        <Button onClick={() => setOpen(true)} color='error'>Delete Account</Button>
        <Dialog open={open} onClose={() => setOpen(false)} >
            <DialogContent>
                Are You Sure You Want To Delete Your Account? This Action Cannot Be Undone
            </DialogContent>
            <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteAccount} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default DeleteAccount
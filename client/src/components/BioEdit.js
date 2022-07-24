import React, { useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { UserContext } from "../context/user";


function BioEdit({ bio, id, action }) {
    const [open, setOpen] = useState(false)
    const [bioForm, setBioForm] = useState(bio)
    const setUser = useContext(UserContext).setUser

    const handleForm = () => setOpen(!open)

    function handleEdit() {
        const config = {
            method: 'PATCH',
            headers: {
                "COntent-Type": "application/json"
            },
            body: JSON.stringify({bio: bioForm})
        }
        fetch(`/users/${id}`, config)
        .then(r => {
            if (r.ok) {
                r.json().then(data => {
                    handleForm()
                    setUser(data)
                })
            }
        })
    }

    return (
        <>
        <Button variant='text' onClick={handleForm} >{action}</Button>
        <Dialog open={open} onClose={handleForm} >
            <DialogTitle>{action}</DialogTitle>
            <DialogContent >
            <TextField
            autoFocus
            id="bio-form"
            label="Edit Bio"
            type="textarea"
            fullWidth
            variant="outlined"
            multiline
            value={bioForm}
            onChange={e => setBioForm(e.target.value)}
          />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEdit} >Save</Button>
                <Button
                color='error'
                onClick={() => {
                    handleForm()
                    setBioForm(bio)
                }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default BioEdit
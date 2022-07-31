import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';

function UserList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (users.length === 0) {
            fetch('/users')
                .then(r => r.json())
                .then(setUsers)
        }
    }, [users])
    return (
        <Container sx={{marginTop: '3%'}}>
            <Paper sx={{textAlign: 'center', color: '#e0e0e0'}}>
                <Grid sx={{width: 'fit-content', margin: 'auto'}} container spacing={2} >
                    {users.map(user => {
                        return (
                            <Grid sx={{width: 'fit-content', margin: 'auto'}} item key={user.id} >
                                <UserCard user={user} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>
        </Container>
    )
}

export default UserList
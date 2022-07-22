import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import HelpButton from './HelpButton';

function ProfilePage({ profile }) {

    if (!profile) return <h1>hi</h1>

    const message = "User's tier is determined by how many games the user has reviewed"

    const helpButton = <HelpButton message={message} />

    return (
        <Container sx={{marginTop: '3%'}}>
            <Paper sx={{textAlign: 'center', color: '#e0e0e0'}}>
                <Typography variant='h3'>
                    {profile.full_name}
                </Typography>
                <Typography variant='h5' >
                    @{profile.username}
                </Typography>
                <br/>
                <Box>
                    <Avatar
                    sx={{
                        width: '10%',
                        height: '10%',
                        margin: 'auto'
                        }}
                    src={profile.avatar_url}
                    />
                    <Typography variant='caption'>
                        My Avatar
                    </Typography>
                    <br/>
                    <Button variant='text' >Change</Button>
                </Box>
                <Typography variant='subtitle1'>
                    <Badge badgeContent={helpButton}>
                        <strong>GamerSpot Tier:</strong>
                    </Badge>
                    <br/>
                    {profile.tier}
                </Typography>
            </Paper>
        </Container>
    )
}

export default ProfilePage
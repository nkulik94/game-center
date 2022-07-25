import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function DetailedGame() {
    const id = useParams().gameId
    const [game, setGame] = useState(null)

    useEffect(() => {
        fetch(`/games/${id}`)
            .then(r => r.json())
            .then(setGame)
    }, [id])
    
    if (!game) return null

    return (
        <Container maxWidth="lg" sx={{marginTop: '3%'}}>
            <Paper sx={{color: '#e0e0e0', overflow: 'auto', padding: 3}}>
                <Card sx={{maxWidth: 800, margin: 'auto', padding: '2rem'}} >
                    <Typography variant="h4" sx={{width: 'fit-content', margin: 'auto', marginBottom: '1rem'}}>{game.title}</Typography>
                    <CardMedia
                    component='img'
                    image={game.thumbnail}
                    sx={{width: '80%', margin: 'auto'}}
                    />
                    <CardContent>
                        <Box sx={{lineHeight: '2rem'}} >
                            <Typography variant="subtitle"><strong>Platform:</strong> {game.platform}</Typography>
                            <br/>
                            <Typography variant="subtitle"><strong>Genre:</strong> {game.genre}</Typography>
                            <br/>
                            <Typography><strong>Game Link:</strong> <a href={game.game_url} >{game.game_url}</a></Typography>
                        </Box>
                        <Typography variant="body" ><strong>Description:</strong> {game.description}</Typography>
                        <Box sx={{lineHeight: '2rem'}} >
                            <Typography variant="subtitle" ><strong>Developer:</strong> {game.developer}</Typography>
                            <br/>
                            <Typography variant="subtitle"><strong>Publisher:</strong> {game.publisher}</Typography>
                            <br/>
                            <Typography variant="subtitle"><strong>Release Date:</strong> {game.release_date}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Paper>
        </Container>
    )
}

export default DetailedGame
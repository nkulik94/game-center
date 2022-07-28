import React from 'react';
import Paper from '@mui/material/Paper';
import GameReviewCard from './GameReviewCard';
import Typography from '@mui/material/Typography';

function ReviewList({ reviews }) {
    return (
        <Paper sx={{color: '#e0e0e0', width: 'fit-content', margin: 'auto', padding: '2rem', backgroundColor: 'khaki'}}>
            <Typography variant='h2' sx={{color: 'black'}}>Reviews:</Typography>
            {reviews.map(review => <GameReviewCard review={review} key={review.id} />)}
        </Paper>
    )
}

export default ReviewList
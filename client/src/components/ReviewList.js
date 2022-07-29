import React from 'react';
import Paper from '@mui/material/Paper';
import GameReviewCard from './GameReviewCard';
import Typography from '@mui/material/Typography';
import UserReviewCard from './UserReviewCard';

function ReviewList({ reviews }) {

    const list = reviews[0].game ? reviews.map(review => <UserReviewCard review={review} key={review.id} />) : reviews.map(review => <GameReviewCard review={review} key={review.id} />)
    return (
        <Paper sx={{color: '#e0e0e0', width: 'fit-content', margin: 'auto', padding: '2rem', backgroundColor: 'khaki'}}>
            <Typography variant='h2' sx={{color: 'black'}}>Reviews:</Typography>
            {list}
        </Paper>
    )
}

export default ReviewList
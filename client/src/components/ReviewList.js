import React from 'react';
import Paper from '@mui/material/Paper';
import GameReviewCard from './GameReviewCard';
import Typography from '@mui/material/Typography';
import UserReviewCard from './UserReviewCard';

function ReviewList({ reviews }) {

    const list = Array.isArray(reviews) ? reviews.map(review => <GameReviewCard review={review} key={review.id} />) : Object.keys(reviews).map(key => <UserReviewCard review={reviews[key]} key={key} />)
    return (
        <Paper sx={{color: '#e0e0e0', width: 'fit-content', margin: 'auto', padding: '2rem', backgroundColor: 'khaki'}}>
            <Typography variant='h2' sx={{color: 'black'}}>Reviews:</Typography>
            {list}
        </Paper>
    )
}

export default ReviewList
import React from "react";
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import StarRateIcon from '@mui/icons-material/StarRate';
import CardMedia from '@mui/material/CardMedia';

function UserReviewCard({ review }) {
    const stars = []

    for (let i = 0; i < review.rating; i++) {
        stars.push(i)
    }

    return (
        <Card sx={{maxWidth: 500, margin: '2rem', padding: '1rem'}}>
            <Typography variant="h5">{review.game}</Typography>
            <br/>
            <CardMedia
            component='img'
            image={review.thumbnail}
            />
            <Typography variant="h6">Rating: {stars.map(star => <StarRateIcon sx={{color: 'yellow'}} key={star} />)}</Typography>
            <CardContent>
                <Typography variant="body">
                    {review.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default UserReviewCard
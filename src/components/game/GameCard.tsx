import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import React from "react"
import { Link as RouterLink } from "react-router-dom"

type GameCardProps = {
    title: string,
    imgSource: string
}

export const GameCard = ({ title, imgSource }: GameCardProps) => {
    return <React.Fragment>
        <RouterLink to="correct-answer" style={{ textDecoration: 'none' }}>
            <Card sx={{ boxShadow: '0 0 6px #41B06E', borderRadius: '20px', px: 1 }}>
                <CardMedia
                    component="img"
                    height="90%"
                    image={imgSource}
                    alt={title}
                    sx={{ mt: '8px', borderRadius: '10px 10px 0 0' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6"> {title} </Typography>
                </CardContent>
            </Card>
        </RouterLink>
    </React.Fragment>
}
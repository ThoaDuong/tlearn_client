import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import React from "react"
import { Link as RouterLink } from "react-router-dom"

type GameCardProps = {
    title: string,
    imgSource: string,
    targetPathname: string
}

export const GameCard = ({ title, imgSource, targetPathname }: GameCardProps) => {
    return <React.Fragment>
        <RouterLink to={targetPathname} style={{ textDecoration: 'none' }}>
            <Card sx={{ boxShadow: '0 0 6px #41B06E', borderRadius: '20px', px: 1 }}>
                <CardMedia
                    component="img"
                    height="120px"
                    image={imgSource}
                    alt={title}
                    sx={{ mt: '8px', borderRadius: '10px 10px 0 0' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="500"> {title} </Typography>
                </CardContent>
            </Card>
        </RouterLink>
    </React.Fragment>
}
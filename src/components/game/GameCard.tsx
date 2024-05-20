import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { colors } from "../../utils/CustomMUI"

type GameCardProps = {
    title: string,
    imgSource: string,
    targetPathname: string,
    index: number
}

export const GameCard = ({ title, imgSource, targetPathname, index }: GameCardProps) => {
    return <React.Fragment>
        <RouterLink to={targetPathname} style={{ textDecoration: 'none' }}>
            <Card sx={{ 
                boxShadow: `0 0 6px ${colors[index]}`, 
                borderRadius: '20px', 
                px: 1, 
                borderTop: '10px solid pink' 
            }}>
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
import { Box, Divider, Typography } from "@mui/material"
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

            {/* Parent container */}
            <Box sx={{
                    border: '1px solid var(--black)',
                    borderRadius: '20px', 
                    position: 'relative',
                    height: '200px',
                    color: 'var(--black)'
                }}>
                    {/* Top | Image */}
                    <Box sx={{ m: 1.5 }}>
                        <Box component="img" sx={{
                            borderRadius: '10px 10px 0 0',
                            height: '120px',
                            width: '100%',
                            objectFit: 'cover',
                        }} src={imgSource} alt={title} />
                    </Box>

                    {/* Bottom | Divider and Title */}
                    <Box sx={{
                        position: 'absolute',
                        top: '75%',
                        zIndex: 2,
                        width: '100%',
                        height: '50px',
                        bgcolor: 'var(--purple)',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px',
                    }}>
                        <Divider sx={{ bgcolor: 'var(--black)' }}/>
                        
                        {/* Display title */}
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 600, mt: 1.5 }}>
                            {title}
                        </Typography>
                    </Box>
                </Box>
        </RouterLink>
    </React.Fragment>
}
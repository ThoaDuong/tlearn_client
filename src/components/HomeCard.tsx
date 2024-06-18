import { Box, Stack, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import React from "react"

type HomeCard = {
    imageSrc: string,
    title: string,
    description: string,
    location: "left" | "right",
    slug: string
}
export const HomeCard = ({ imageSrc, title, description, location, slug }: HomeCard) => {
    return (<React.Fragment>
        {/* Container block */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

            {/* Main block */}
            <Stack sx={{ 
                display: 'block', 
                height: {xs: '300px', md: '200px', lg: '300px'},
                order: location === 'left' ? 1 : 2 
            }}>
                <Box sx={{ position: 'relative' }}>

                    {/* Shadow Box */}
                    <Box sx={{
                        position: 'absolute',
                        top: 0, 
                        left: location === 'left' ? 0 : 'none',
                        right: location === 'right' ? 0 : 'none',
                        zIndex: 1,
                        width: '250px', 
                        height: {xs: '100px', md: '120px', lg: '300px'},
                        bgcolor: 'var(--light-green)',
                        borderRadius: '30px'
                    }}></Box>

                    {/* Image Box */}
                    <Box component="img" sx={{
                        position: 'absolute',
                        top: {xs: 15, md: 20}, 
                        left: location === 'left' ? {xs: 15, md: 20} : 'none',
                        right: location === 'right' ?  {xs: 15, md: 20} : 'none',
                        zIndex: 2,
                        width: '250px', 
                        height: {xs: '100px', md: '120px', lg: '300px'},
                        borderRadius: '30px',
                        objectFit: 'cover',
                        border: '1px solid var(--black)'
                    }}
                        src={imageSrc}
                    />

                    {/* Text Box */}
                    <Box sx={{
                        position: 'absolute',
                        left: location === 'left' ? {xs: 15, md: 20, lg: '300px'} : 'none',
                        right: location === 'right' ? {xs: 15, md: 20, lg: '300px'} : 'none',
                        top: {xs: '130px', md: '150px', lg: '120px'},
                        zIndex: 3,
                        width: {xs: window.innerWidth - 120, sm: window.innerWidth - 250, md: '400px', lg: '500px'},
                        textAlign: location === 'left' ? 'left' : 'right'
                    }}>

                        {/* Display title */}
                        <Typography component={RouterLink} to={slug} sx={{ 
                            fontSize: 20, 
                            textDecoration: 'none', 
                            fontWeight: 500, 
                            color: 'var(--blue)' 
                        }}>
                            {title}
                        </Typography>

                        {/* Display description */}
                        <Typography sx={{ color: 'var(--black)', fontSize: {xs: 14, md: 16} }}>
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </Stack>

            {/* Hidden block */}
            <Stack sx={{ visibility: 'hidden', order: location === 'right' ? 1 : 2 }}></Stack>
        </Box>
    </React.Fragment>)
}
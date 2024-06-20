import { Box, Typography } from "@mui/material"
import React, { useRef } from "react"

export const AboutPage = () => {

    // variable 
    const envelopeRef = useRef<any>(null);

    // function
    const handleClickEnvelope = () => {
        envelopeRef.current?.classList.toggle('flap');
    }

    return (<React.Fragment>

        <Box className="container" sx={{
            height: '70vh',
            display: 'grid',
            placeItems: 'center',
        }}>
            <Box sx={{ color: 'var(--black)', mt: '50px', textAlign: 'center' }}>
                <Typography variant="h5" >
                    From the Coder's Heart
                </Typography>
                <Typography variant="body1" >
                    Give the heart a little tap to make the letter bloom!
                </Typography>
            </Box>

            <Box className="envelope-wrapper" ref={envelopeRef} onClick={handleClickEnvelope} sx={{
                background: 'var(--light-green)',
                boxShadow: '0 0 40px var(--shadow-color)',
            }}>
                <Typography className="envelope" sx={{
                    position: 'relative',
                    width: {xs: `${window.innerWidth - 50}px`, md: '600px'},
                    height: {xs: '300px'},
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        zIndex: 2,
                        borderTop: {xs: '180px solid var(--light-green)'},
                        borderRight: {xs: `${(window.innerWidth - 50)/2}px solid transparent` , md: '300px solid transparent'},
                        borderLeft: {xs: `${(window.innerWidth - 50)/2}px solid transparent`, md: '300px solid transparent'},
                        transformOrigin: 'top',
                        transition: 'all 0.5s ease-in-out 0.7s',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        zIndex: 2,
                        width: 0,
                        height: 0,
                        borderTop: {xs: '180px solid transparent'},
                        borderRight: {xs: `${(window.innerWidth - 50)/2}px solid var(--light-pink)`, md: '300px solid var(--light-pink)'},
                        borderBottom: {xs: '120px solid var(--light-pink)'},
                        borderLeft: {xs: `${(window.innerWidth - 50)/2}px solid var(--light-pink)`, md: '300px solid var(--light-pink)'},
                    }
                }}>
                    <Typography className="letter" sx={{
                        position: 'absolute',
                        right: '20%',
                        bottom: '5%',
                        width: '54%',
                        height: '80%',
                        background: 'white',
                        textAlign: 'center',
                        transition: 'all 1s ease-in-out',
                        boxShadow: '0 0 5px var(--shadow-color)',
                        padding: {xs: '10px', md: '20px 30px'},
                    }}>
                        <Typography className="text" sx={{ 
                            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                            color: 'var(--black)',
                            textAlign: 'left',
                            fontSize: {xs: '9px', md: '10px'},
                         }}>
                            <p style={{ paddingBottom: '4px' }}><strong>Greetings, Language Explorers!</strong></p>
                            <p>
                                I'm Thoa Duong (Maddie), a developer with a passion for languages.
                                This website is my creation, and I'm constantly building and refining it based on your input.
                            </p>
                            <p style={{ padding: '4px 0' }}>
                                Feedback is My Fuel!
                            </p>
                            <p>
                                As a solo developer, I rely on your feedback to make this website the best it can be.  
                                Let me know what you think at kimthoa2598@gmail.com.  Thanks for joining the adventure!
                            </p>
                            <p style={{ textAlign: 'right' }}>
                                Best Regards,<br/>
                                Thoa Duong (Maddie)
                            </p>
                        </Typography>
                    </Typography>
                </Typography>
                <Box className="heart" sx={{
                    position: 'absolute',
                    top: {xs: '55%', md: '58%'},
                    left: '50%',
                    width: '20px',
                    height: '20px',
                    background: 'var(--dark-pink)',
                    zIndex: 4,
                    transform: 'translate(-50%, -20%) rotate(45deg)',
                    transition: 'transform 0.5s ease-in-out 1s',
                    boxShadow: '0 1px 6px var(--shadow-color)',
                    cursor: 'pointer',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--dark-pink)',
                        borderRadius: '50%',
                        top: '-7.5px'
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--dark-pink)',
                        borderRadius: '50%',
                        right: '7.5px'
                    }
                }}></Box>
            </Box>
        </Box>

    </React.Fragment>)
}
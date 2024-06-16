import React from "react"
import { Grid, Typography } from "@mui/material"
import { GameCard } from "../components/game/GameCard"
import gameChoose from '../assets/Choose.png'
import gameOutOfTime from '../assets/Out_of_time.png'
import gameMeaningMaster from '../assets/meaning.jpg'

export const GamePage = () => {
    return(
    <React.Fragment>
        {/* Display title */}
        <Typography sx={{ py:2, flexGrow: 1 }} variant="h5">
            Do exercise to memorize vocabulary
        </Typography>

        {/* Display list game */}
        <Grid container spacing={2}>


            {/* Display game: choose the correct answer  */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <GameCard 
                    title="Choose the correct answer"
                    imgSource={gameChoose}  
                    targetPathname="correct-answer"
                />
            </Grid>
            
            {/* Display game: running out of time */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <GameCard 
                    title="Running out of time"
                    imgSource={gameOutOfTime}
                    targetPathname="out-of-time"
                />
            </Grid>

            {/* Display game: meaning master */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <GameCard 
                    title="Meaning master"
                    imgSource={gameMeaningMaster}
                    targetPathname="meaning-master"
                />
            </Grid>
        </Grid>
    </React.Fragment>
)}
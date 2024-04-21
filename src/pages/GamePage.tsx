import React from "react"
import { Grid, Typography } from "@mui/material"
import { GameCard } from "../components/game/GameCard"
import gameImg from '../assets/Game_Choose.png'

export const GamePage = () => {
    return(
    <React.Fragment>
        {/* Display title */}
        <Typography sx={{ py:2, flexGrow: 1 }} variant="h5">
            Play game to learn vocabulary
        </Typography>

        {/* Display list game */}
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>

                {/* Display game: choose the correct answer  */}
                <GameCard 
                    title="Choose the correct answer"
                    imgSource={gameImg}
                />
            </Grid>
        </Grid>
    </React.Fragment>
)}
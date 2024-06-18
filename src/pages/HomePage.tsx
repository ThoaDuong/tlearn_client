import { Stack } from "@mui/material"
import React from "react"
import { HomeCard } from "../components/HomeCard"
import homeFirst from "../assets/home/home_first.avif"
import homeSecond from "../assets/home/home_second.avif"
import homeThird from "../assets/home/home_third.jpg"

export const HomePage = () => {
    return (<React.Fragment>
        <Stack sx={{ margin: {xs: '20px 10px 40px 10px', md: '30px 30px 60px 30px'} }}>

            <HomeCard 
                imageSrc={homeFirst} 
                title="Store Vocabulary to Expand Your Knowledge"
                description=" Build your personal word bank! 
                    Our platform lets you easily add new words you encounter, whether from reading, conversation, or anywhere else."
                location="left"
                slug="voca"
            />

            <HomeCard 
                imageSrc={homeSecond} 
                title="Memorize Vocabularies"
                description=" Learning shouldn't be boring! Put your memory to the test with a variety of interactive exercises designed to help you solidify new words and their meanings. 
                    This could include flashcards, matching games, sentence completion, and more."
                location="right"
                slug="game"
            />

            <HomeCard 
                imageSrc={homeThird} 
                title="Sharpen Your Writing Skills"
                description="Capture your thoughts and ideas effortlessly. 
                    Our writing tool allows you to jot down new vocabulary you learn, create sentences using those words, or simply brainstorm ideas
                     – all in one convenient place."
                location="left"
                slug="writing"
            />

         
        </Stack>


        
    </React.Fragment>)
}
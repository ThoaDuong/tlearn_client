import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import Vocabulary from "../../interfaces/Vocabulary";
import { fetchVocaListByUserID } from "../../stores/slices/vocaSlice";
import { SpeechSynthesis } from "../../utils/SpeechSynthesis";
import dingAudio from '../../assets/Ding_SoundEffect.mp3';
import { CheckCircleOutline, Close, HighlightOff } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';


export const GameCorrectAnswer = () => {

    // variable
    const [questionVoca, setQuestionVoca] = useState<Vocabulary>();
    const [answerWords, setAnswerWords] = useState<string[]>([]);
    const [selectedWord, setSelectedWord] = useState<string>("");


    // redux
    const vocaStore = useSelector((state: RootState) => state.vocabulary);
    const userStore = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(userStore.id){
            dispatch(fetchVocaListByUserID(userStore.id));
        }
    }, [userStore]);

    // watch list voca change
    useEffect(() => {
        if(vocaStore.listVoca?.length >= 4){
            setSelectedWord("");
            initialQuestion(vocaStore.listVoca);
        }
    },[vocaStore.listVoca])

    // shuffle array randomly
    const shuffle = (vocaList: Vocabulary[]) => {
        let currentIndex = vocaList.length;
        let tempVocaList = [ ...vocaList ];

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [tempVocaList[currentIndex], tempVocaList[randomIndex]] = [tempVocaList[randomIndex], tempVocaList[currentIndex]];
        }
        return tempVocaList;
    }

    // initial a question information | questionObject
    const initialQuestion = (vocaList: any) => {
        const shuffledVoca = shuffle(vocaList).splice(0, 4); 
        let tempAnswerWords = shuffledVoca.map((voca: any) => voca.word);

        setQuestionVoca(shuffledVoca[0]);
        setAnswerWords(tempAnswerWords.sort());
    }

    const handleChooseAnswer = (word: string) => {
        SpeechSynthesis(word);
        setSelectedWord(word);
        
        if(questionVoca?.word === word){
            // correct
            const timerShort = setTimeout(() => {
                const audio = new Audio(dingAudio);
                audio.play();

                clearTimeout(timerShort);
            }, 300)
            const timerLong = setTimeout(() => {
                setSelectedWord("");
                initialQuestion(vocaStore.listVoca);

                clearTimeout(timerLong);
            }, 1200)
        }else{
            // incorrect
        }
    }




    return <React.Fragment>
        {/* Display close button */}
        <Button component={RouterLink} to="/game"
            sx={{ float: 'right', mt: 3, borderRadius: '30px', px: 2 }} 
            startIcon={<Close/>} 
            size="small" 
            variant="contained" 
            color="error">
            Close
        </Button>

        {/* Display title */}
        <Typography sx={{ py: 2, flexGrow: 1, fontWeight: 'semibold' }} variant="h5">
            Choose the correct answer
        </Typography>


        {/* Display questiong: meaning */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ boxShadow: '0 0 10px #90D26D', borderRadius: '20px', px: 1, width: '50%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6"> {questionVoca?.meaning} </Typography>
                </CardContent>
            </Card>

            {/* Display correct and incorrect icons */}
            { selectedWord === questionVoca?.word && 
                <CheckCircleOutline sx={{ mt: 3, ml: 2, fontSize: '30px' }} color="success" />} 

            { selectedWord.length > 0 && selectedWord !== questionVoca?.word && 
                <HighlightOff sx={{ mt: 3, ml: 2, fontSize: '30px' }} color="error" />}
        </Box>


        {/* Display list answers: word */}
        <Grid container spacing={3} sx={{ py: 3 }}>
            { answerWords.map(word => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={word}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            variant={ selectedWord === word ? 'contained' : 'outlined' } 
                            onClick={() => handleChooseAnswer(word)}
                            sx={{ 
                                textTransform: 'none', 
                                fontSize: '18px', 
                                borderRadius: '30px', 
                                px: 4 
                            }}>
                                {word} 
                        </Button>
                    </Box>
                </Grid>
            )) }
        </Grid>

    </React.Fragment>
}
import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import Vocabulary from "../../interfaces/Vocabulary";
import { fetchVocaListByUserID } from "../../stores/slices/vocaSlice";
import { speechSynthesis } from "../../utils/SpeechSynthesis";
import correctAudio from '../../assets/Correct_SoundEffect.mp3';
import incorrectAudio from '../../assets/Incorrect_SoundEffect.mp3';
import { CheckCircleOutline, HighlightOff, VolumeUp } from "@mui/icons-material";
import { fetchGroupsByUserID } from "../../stores/slices/groupSlice";
import { shuffle } from "../../utils/Shuffle";
import { useNavigate } from "react-router-dom";
import { TitleAndChooseGroup } from "./TitleAndChooseGroup";
import { alertNoEnoughVocabulary } from "../../utils/SweetAlert";


export const GameCorrectAnswer = () => {

    // variable
    const [questionVoca, setQuestionVoca] = useState<Vocabulary>();
    const [answerWords, setAnswerWords] = useState<string[]>([]);
    const [selectedWord, setSelectedWord] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("All");
    const navigator = useNavigate();


    // redux
    const vocaStore = useSelector((state: RootState) => state.vocabulary);
    const userStore = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();


    // watch user change
    useEffect(() => {
        if(userStore.id){
            dispatch(fetchVocaListByUserID(userStore.id));
            dispatch(fetchGroupsByUserID(userStore.id));
        }
    }, [userStore]);

    // watch list voca change
    useEffect(() => {
        // init question with All group when renderd
        if(vocaStore.listVoca?.length >= 5){
            setSelectedWord("");
            initialQuestion(vocaStore.listVoca);
        }else{
            alertNoEnoughVocabulary(handleCallbackAlert);
        }
    },[vocaStore.listVoca])

    // watch group name change
    useEffect(() => {
        initialQuestionFilterByGroupName();
    }, [groupName, vocaStore.listVoca])

    
    // FUNCTION

    const handleCallbackAlert = (result: any) => {
        if(result.isConfirmed || result.dismiss === "backdrop"){
            navigator(-1);
        }
    }

    const initialQuestionFilterByGroupName = () => {
        setSelectedWord("");
        if(groupName === 'All'){
            initialQuestion(vocaStore.listVoca);
        }else {
            const vocaFilterByGroup: Vocabulary[] = vocaStore.listVoca.filter((voca: Vocabulary) => voca.groupName === groupName);
            initialQuestion(vocaFilterByGroup);
        }
    }

    // initial a question information
    const initialQuestion = (vocaList: any) => {
        const shuffledVoca = shuffle(vocaList).splice(0, 4); 
        let tempAnswerWords = shuffledVoca.map((voca: any) => voca.word);

        setQuestionVoca(shuffledVoca[0]);
        setAnswerWords(tempAnswerWords.sort());
    }

    // callback: trigger at the end of the speaking
    const callbackOnEnd = (word: string) => {
        const audio = questionVoca?.word === word ? new Audio(correctAudio) : new Audio(incorrectAudio);
        audio.volume = 0.1;
        audio.play();
    }

    // click answer
    const handleChooseAnswer = (word: string) => {
        setSelectedWord(word);
        speechSynthesis(word, callbackOnEnd(word));
    }

    // click next question
    const handleNextQuestion = () => {
        initialQuestionFilterByGroupName();
    }

    const handleSpeakExampleSentence = () => {
        speechSynthesis(questionVoca?.example || "");
    }




    return <React.Fragment>
        <Box sx={{ p: 3, textAlign: 'center' }} >

            {/* Display title and choose group name */}
            <Box sx={{ mx: 'auto', mb: 2, width: { xs: '100%', md: '50%' } }}>
                <TitleAndChooseGroup
                    title="Choose the correct answer"
                    groupName={groupName}
                    setGroupName={setGroupName}
                />
            </Box>

            <Paper elevation={3} sx={{ 
                mt: 3, p: 3, 
                textAlign: 'center', 
                mx: 'auto',
                bgcolor: '#E1F7F5', 
                width: { xs: '100%', md: '600px' }
            }}>
                {/* Display question: meaning */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    
                    <Box sx={{ textAlign: 'center' }}>
                        
                        {/* Display correct and incorrect icons */}
                        <Box>
                            { selectedWord === questionVoca?.word && 
                                <CheckCircleOutline sx={{ fontSize: '30px' }} color="success" />} 

                            { selectedWord.length > 0 && selectedWord !== questionVoca?.word && 
                                <HighlightOff sx={{ fontSize: '30px' }} color="error" />}
                        </Box>
                        
                        {/* Meaning text  */}
                        <Typography variant="h6"> {questionVoca?.meaning} </Typography>
                        { selectedWord === questionVoca?.word &&  <Typography variant="subtitle1"> / {questionVoca?.type} / </Typography>}
                        { selectedWord === questionVoca?.word &&  
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="subtitle1"> {questionVoca?.example} </Typography> 
                                <Button size="small" onClick={handleSpeakExampleSentence}>
                                    <VolumeUp fontSize="small"/>
                                </Button> 
                            </Box>
                        }
                    </Box>
                   

                </Box>


                {/* Display list answers: word */}
                <Grid container spacing={1} sx={{ py: 3 }}>
                    { answerWords.map(word => (
                        <Grid item xs={12} md={6} key={word} >
                            <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                                <Button 
                                    onClick={() => handleChooseAnswer(word)}
                                    sx={{ 
                                        textTransform: 'none', 
                                        fontSize: '18px', 
                                        width: '100%',
                                        mx: { xs: '20px', md: '0px' },
                                        textAlign: 'center',
                                        bgcolor: selectedWord === word ? '#40A578' : 'white',
                                        color: selectedWord === word ? 'white' : 'black',
                                        '&:hover': {
                                            bgcolor: '#9AC8CD',
                                        }
                                    }}>
                                        {word} 
                                </Button>
                            </Box>
                        </Grid>
                    )) }
                </Grid>
            </Paper>


            {/* Display quit button */}
            <Button
                onClick={() => (navigator(-1))}
                variant="contained"
                color="error"
                size="small" 
                sx={{ borderRadius: '30px', px: 2, mr: 1 }}
            > Quit </Button>
            
            {/* Display next question button */}
            <Button onClick={handleNextQuestion}
                sx={{ borderRadius: '30px', px: 2, my: 2 }} 
                size="small" 
                variant="contained" 
                disabled={selectedWord !== questionVoca?.word}>
                Next Question
            </Button>
        </Box>

    </React.Fragment>
}
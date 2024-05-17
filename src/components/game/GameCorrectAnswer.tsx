import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import Vocabulary from "../../interfaces/Vocabulary";
import { fetchVocaListByUserID } from "../../stores/slices/vocaSlice";
import { speechSynthesis } from "../../utils/SpeechSynthesis";
import correctAudio from '../../assets/Correct_SoundEffect.mp3';
import incorrectAudio from '../../assets/Incorrect_SoundEffect.mp3';
import { CheckCircleOutline, Close, HighlightOff } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';
import { fetchGroupsByUserID } from "../../stores/slices/groupSlice";
import { shuffle } from "../../utils/Shuffle";


export const GameCorrectAnswer = () => {

    // variable
    const [questionVoca, setQuestionVoca] = useState<Vocabulary>();
    const [answerWords, setAnswerWords] = useState<string[]>([]);
    const [selectedWord, setSelectedWord] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("All");


    // redux
    const vocaStore = useSelector((state: RootState) => state.vocabulary);
    const userStore = useSelector((state: RootState) => state.user);
    const groupStore = useSelector((state: RootState) => state.group);
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
        if(vocaStore.listVoca?.length >= 4){
            setSelectedWord("");
            initialQuestion(vocaStore.listVoca);
        }
    },[vocaStore.listVoca])

    // watch group name change
    useEffect(() => {
        initialQuestionFilterByGroupName();
    }, [groupName, vocaStore.listVoca])

    
    // FUNCTION

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




    return <React.Fragment>
        <Box sx={{ p: 3, textAlign: 'center' }} >
            {/* Display close button */}
            <Button component={RouterLink} to="/game"
                sx={{ borderRadius: '50%', minWidth: '20px', p: 1, position: 'absolute', right: '48px' }} 
                size="small" 
                variant="contained" 
                color="error">
                    <Close sx={{ fontSize: '18px', fontWeight: 'bold' }} />
            </Button>

            {/* Display title */}
            <Typography sx={{ pt: {xs: ' 40px', md: '0'}, pb: 1, flexGrow: 1, fontWeight: 'semibold' }} variant="h5">
                Choose the correct answer
            </Typography>

            {/* Display filter by group name */}
            <Box sx={{ mb: 2 }}>
                {/* Display group name title */}
                <Typography sx={{ fontWeight: 'semibold', py: 1 }} variant="body1">
                    Choose a group for vocabulary focus:
                </Typography>
                {/* Field: group name */}
                <FormControl size="small" sx={{ mb: 2, width: {xs: '100%', md: '30%'} }}>
                    <InputLabel id="groupInput">Group</InputLabel>
                    <Select id="groupSelect" labelId="groupInput" label="Group"
                        value={groupName}
                        onChange={(event) => setGroupName(event.target.value)}
                    >
                        <MenuItem aria-label="None" value="All">
                            <Typography>All</Typography>
                        </MenuItem>

                        {groupStore.listGroup.map((group: any) => (
                            <MenuItem key={group.id} value={group.groupName}>
                                <Typography>
                                    {group.groupName}
                                </Typography>
                                    
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                        { selectedWord === questionVoca?.word &&  <Typography variant="subtitle1"> {questionVoca?.example} </Typography>}
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
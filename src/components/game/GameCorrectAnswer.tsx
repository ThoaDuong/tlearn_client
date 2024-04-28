import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import Vocabulary from "../../interfaces/Vocabulary";
import { fetchVocaListByUserID } from "../../stores/slices/vocaSlice";
import { speechSynthesis } from "../../utils/SpeechSynthesis";
import correctAudio from '../../assets/Correct_SoundEffect.mp3';
import incorrectAudio from '../../assets/Incorrect_SoundEffect.mp3';
import { ArrowForwardIos, CheckCircleOutline, Close, HighlightOff } from "@mui/icons-material";
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
        {/* Display close button */}
        <Button component={RouterLink} to="/game"
            sx={{ float: 'right', mt: 3, borderRadius: '30px', px: 2 }} 
            endIcon={<Close/>} 
            size="small" 
            variant="contained" 
            color="error">
            Close
        </Button>

        {/* Display title */}
        <Typography sx={{ py: 2, flexGrow: 1, fontWeight: 'semibold' }} variant="h5">
            Choose the correct answer
        </Typography>

        {/* Display filter by group name */}
        <Box sx={{ mb: 2 }}>
            {/* Display group name title */}
            <Typography sx={{ fontWeight: 'semibold', width: 'fit-content', py: 1 }} variant="body1">
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

        {/* Display question: meaning */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ boxShadow: '0 0 10px #90D26D', borderRadius: '20px', px: 1, width: '60%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6"> {questionVoca?.meaning} </Typography>
                    { selectedWord === questionVoca?.word &&  <Typography variant="subtitle1"> {questionVoca?.example} </Typography>}
                </CardContent>
            </Card>

            {/* Display correct and incorrect icons */}
            { selectedWord === questionVoca?.word && 
                <CheckCircleOutline sx={{ ml: 2, fontSize: '30px' }} color="success" />} 

            { selectedWord.length > 0 && selectedWord !== questionVoca?.word && 
                <HighlightOff sx={{ ml: 2, fontSize: '30px' }} color="error" />}
        </Box>


        {/* Display list answers: word */}
        <Grid container spacing={3} sx={{ py: 3 }}>
            { answerWords.map(word => (
                <Grid item xs={12} sm={6} lg={3} key={word}>
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
        
        {/* Display next question button */}
        <Button onClick={handleNextQuestion}
            sx={{ float: 'right', my: 3, borderRadius: '30px', px: 2 }} 
            endIcon={<ArrowForwardIos />} 
            size="small" 
            variant="contained" 
            color="success"
            disabled={selectedWord !== questionVoca?.word}>
            Next Question
        </Button>

    </React.Fragment>
}
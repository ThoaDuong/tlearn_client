import { Avatar, Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Vocabulary from "../../interfaces/Vocabulary";
import { shuffle } from "../../utils/Shuffle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import { fetchVocaListByUserID } from "../../stores/slices/vocaSlice";
import { fetchGroupsByUserID } from "../../stores/slices/groupSlice";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { speechSynthesis } from "../../utils/SpeechSynthesis";
import correctAudio from '../../assets/Correct_SoundEffect.mp3';
import incorrectAudio from '../../assets/Incorrect_SoundEffect.mp3';
import { alertLoseGame } from "../../utils/SweetAlert";
import { StyledLinearProgress } from "../../utils/CustomMUI";
import { useNavigate } from "react-router-dom";


export const GameOutOfTime = () => {

    // variable
    const [questionVoca, setQuestionVoca] = useState<Vocabulary|null>(null);
    const [answerWords, setAnswerWords] = useState<string[]>([]);
    const [selectedWord, setSelectedWord] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("All");
    const [startCountDown, setStartCountDown] = useState<boolean>(false);
    const [timer, setTimer] = useState<any>();
    const [isShowQuestion, setIsShowQuestion] = useState<boolean>(false);
    const [point, setPoint] = useState<number>(0);
    const navigator = useNavigate();

    // redux
    const vocaStore = useSelector((state: RootState) => state.vocabulary);
    const userStore = useSelector((state: RootState) => state.user);
    const groupStore = useSelector((state: RootState) => state.group);
    const dispatch: AppDispatch = useDispatch();

    // watch user change
    useEffect(() => {
        if (userStore.id) {
            dispatch(fetchVocaListByUserID(userStore.id));
            dispatch(fetchGroupsByUserID(userStore.id));
        }
    }, [userStore]);

    // FUNCTION 

    // initial each question information
    const initialQuestion = (vocaList: any) => {
        const shuffledVoca = shuffle(vocaList).splice(0, 2);
        let tempAnswerWords = shuffledVoca.map((voca: any) => voca.word);

        setQuestionVoca(shuffledVoca[0]);
        setAnswerWords(tempAnswerWords.sort());
    }

    // filter vocabularies by group for each question
    const initialQuestionFilterByGroupName = () => {
        setSelectedWord("");
        if (groupName === 'All') {
            initialQuestion(vocaStore.listVoca);
        } else {
            const vocaFilterByGroup: Vocabulary[] = vocaStore.listVoca.filter((voca: Vocabulary) => voca.groupName === groupName);
            initialQuestion(vocaFilterByGroup);
        }
    }

    // click start button
    const handleStart = () => {
        initialQuestionFilterByGroupName();
        setIsShowQuestion(true);
        handleTimeoutForQuestion();
    }

    // trigger after handleChooseAnswer()
    const callbackOnEndSpeaking = (word: string) => {
        const audio = questionVoca?.word === word ? new Audio(correctAudio) : new Audio(incorrectAudio);
        audio.volume = 0.1;
        audio.play();
        
    }

    // handle click answer
    const handleChooseAnswer = (word: string) => {
        setSelectedWord(word);
        speechSynthesis(word, callbackOnEndSpeaking(word));

        if(word === questionVoca?.word){
            handleChooseCorrect();
        }else{
            handleLoseGame();
        }
    }

    // handle chosse correct answer
    const handleChooseCorrect = () => {
        // increase point
        setPoint(point+1);

        // clear countdown timer of previous question
        clearTimeout(timer);

        // move on to new question
        initialQuestionFilterByGroupName();
        handleTimeoutForQuestion();

        // re-render progress UI
        setStartCountDown(false);
        const tempTimer = setTimeout(() => {
            setStartCountDown(true);
            clearTimeout(tempTimer);
        }, 100)
    }

    // show alert and clear variables when losing
    const handleLoseGame = () => {
        alertLoseGame(point);
        clearTimeout(timer);
        setStartCountDown(false);
        setIsShowQuestion(false);
        setSelectedWord("");
        setQuestionVoca(null);
        setAnswerWords([]);
        setPoint(0);
    }

    // handle do not take action when runing out of time | lose game
    const handleTimeoutForQuestion = () => {
        setStartCountDown(true);
        setTimer(setTimeout(() => {
            if (!selectedWord) {
                handleLoseGame();
            }
        }, 3100));
    }



    return <React.Fragment>

        {/* Display start block */}
        { !isShowQuestion && <Paper elevation={3} sx={{ textAlign: 'center', mt: 3, p: 3 }}>

            {/* Display title */}
            <Typography sx={{ pt: {xs: ' 40px', md: '0'}, pb: 1, flexGrow: 1, fontWeight: 'semibold' }} variant="h5">
                Running out of time
            </Typography>

            <Typography> Choose a group for vocabulary focus:  </Typography>

            {/* Field: group name */}
            <FormControl size="small" sx={{ mb: 2, width: { xs: '100%', md: '30%' } }}>
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

            <Typography> You need to answer the question in 3 seconds.</Typography>
            <br />

            {/* Display cancel button */}
            <Button
                onClick={() => (navigator(-1))}
                variant="contained"
                color="error"
                sx={{ borderRadius: '30px', px: 2, mr: 1 }}
            > Cancel </Button>
            {/* Display start button */}
            <Button
                onClick={handleStart}
                disabled={isShowQuestion}
                variant="contained"
                sx={{ borderRadius: '30px', px: 2 }}
            >
                Start
            </Button>
        </Paper>}

        {/* Display question and anwers */}
        { isShowQuestion && <Paper elevation={3} sx={{ mt: 3, p: 3 }}>

            {/* Display point */}
            <Avatar sx={{ float: 'right', mt: 3,  bgcolor: '#E72929' }}> {point} </Avatar>

            {/* Display timer progress bar */}
            {startCountDown && <Box sx={{ width: '100%', mb: 3 }}>
                <StyledLinearProgress variant="indeterminate" />
            </Box>}


            {/* Display question: meaning */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ 
                    boxShadow: '0 0 10px #90D26D', 
                    borderRadius: '20px', 
                    px: 1, 
                    width: { xs: '100%', md: '60%' }
                }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6"> {questionVoca?.meaning} </Typography>
                        {selectedWord === questionVoca?.word && <Typography variant="subtitle1"> {questionVoca?.example} </Typography>}
                    </CardContent>
                </Card>

                {/* Display correct and incorrect icons */}
                {selectedWord === questionVoca?.word &&
                    <CheckCircleOutline sx={{ ml: 2, fontSize: '30px' }} color="success" />}

                {selectedWord.length > 0 && selectedWord !== questionVoca?.word &&
                    <HighlightOff sx={{ ml: 2, fontSize: '30px' }} color="error" />}
            </Box>

            {/* Display list answers: word */}
            <Grid container spacing={3} sx={{ py: 3 }}>
                {answerWords.map(word => (
                    <Grid item xs={12} key={word}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant={selectedWord === word ? 'contained' : 'outlined'}
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
                ))}
            </Grid>
        </Paper>}
            

    </React.Fragment>
}
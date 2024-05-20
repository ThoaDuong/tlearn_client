import { Box, Button, FormControl, Paper, TextField, Typography } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { TitleAndChooseGroup } from "./TitleAndChooseGroup"
import Vocabulary from "../../interfaces/Vocabulary";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/store";
import { fetchVocaListByUserID } from "../../stores/slices/vocaSlice";
import { fetchGroupsByUserID } from "../../stores/slices/groupSlice";
import { shuffle } from "../../utils/Shuffle";
import { useNavigate } from "react-router-dom";
import correctAudio from '../../assets/Correct_SoundEffect.mp3';
import incorrectAudio from '../../assets/Incorrect_SoundEffect.mp3';
import { speechSynthesis } from "../../utils/SpeechSynthesis";


export const GameMeaningMaster = () => {

    // variable
    const [groupName, setGroupName] = useState('All');
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [isPressEnter, setIsPressEnter] = useState(false);
    const [questionVoca, setQuestionVoca] = useState<Vocabulary>();
    const [answerMeaning, setAnswerMeaning] = useState<string>("");
    const answerMeaningInput = useRef<any>(null);
    const navigator = useNavigate();
    
    // redux
    const vocaStore = useSelector((state: RootState) => state.vocabulary);
    const userStore = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();

    // watch user change
    useEffect(() => {
        if (userStore.id) {
            dispatch(fetchVocaListByUserID(userStore.id));
            dispatch(fetchGroupsByUserID(userStore.id));
        }
    }, [userStore]);

    // watch list voca change
    useEffect(() => {
        // init question with All group when renderd
        if (vocaStore.listVoca?.length >= 4) {
            setAnswerMeaning("");
            initialQuestion(vocaStore.listVoca);
        }
    }, [vocaStore.listVoca])

    // watch group name change
    useEffect(() => {
        initialQuestionFilterByGroupName();
    }, [groupName, vocaStore.listVoca])


    // FUNCTION

    const initialQuestionFilterByGroupName = () => {
        setAnswerMeaning("");
        if (groupName === 'All') {
            initialQuestion(vocaStore.listVoca);
        } else {
            const vocaFilterByGroup: Vocabulary[] = vocaStore.listVoca.filter((voca: Vocabulary) => voca.groupName === groupName);
            initialQuestion(vocaFilterByGroup);
        }
    }

    // initial a question information
    const initialQuestion = (vocaList: any) => {
        const shuffledVoca = shuffle(vocaList).splice(0, 1);
        setQuestionVoca(shuffledVoca[0]);
        answerMeaningInput.current?.focus();
    }

     // callback: trigger at the end of the speaking
     const callbackOnEnd = (word: string) => {
        const audio = questionVoca?.word === word ? new Audio(correctAudio) : new Audio(incorrectAudio);
        audio.volume = 0.1;
        audio.play();
    }

    // enter meaning
    const handlePressEnter = (event: any) => {
        // press enter
        if (event.key === 'Enter') {
            setIsPressEnter(true);
            speechSynthesis(answerMeaning, callbackOnEnd(answerMeaning));

            // correct meaning
            if(answerMeaning.toLocaleLowerCase() === questionVoca?.word.toLocaleLowerCase()){
                setIsCorrectAnswer(true);
            }
        }
    }

    // next question
    const handleNextQuestion = () => {
        setIsCorrectAnswer(false);
        setIsPressEnter(false);
        initialQuestionFilterByGroupName();
    }

    // give up
    const handleGiveUp = () => {
        setIsCorrectAnswer(true);
        setIsPressEnter(false);
    }

    return (<React.Fragment>
        <Box sx={{ p: 3, textAlign: 'center' }}>
            {/* Display title and choose group name */}
            <Box sx={{ mx: 'auto', mb: 2, width: { xs: '100%', md: '50%' } }}>
                <TitleAndChooseGroup
                    title="Meaning Master"
                    groupName={groupName}
                    setGroupName={setGroupName}
                />
            </Box>

            <Typography> Press 'Enter' to answer.</Typography>
            <br/>

            <Paper elevation={3} sx={{
                mt: 3, p: 3,
                textAlign: 'center',
                mx: 'auto',
                bgcolor: '#FFEFEF',
                width: { xs: '100%', md: '600px' }
            }}>

                {/* Display question: meaning */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Box sx={{ textAlign: 'center' }}>

                        {/* Display correct and incorrect icons */}
                        <Box>
                            {isCorrectAnswer &&
                                <CheckCircleOutline sx={{ fontSize: '30px' }} color="success" />}

                            {isPressEnter && !isCorrectAnswer &&
                                <HighlightOff sx={{ fontSize: '30px' }} color="error" />}
                        </Box>

                        {/* Meaning text  */}
                        <Typography variant="h6"> {questionVoca?.meaning} </Typography>
                        { isCorrectAnswer && <Box>
                            <Typography variant="h5"> {questionVoca?.word} </Typography>
                            <Typography variant="subtitle1"> / {questionVoca?.type} / </Typography>
                            <Typography variant="subtitle1"> {questionVoca?.example} </Typography>
                        </Box> }
                    </Box>
                </Box>


                {/* Field: answer meaning */}
                <Box sx={{ mt: 3 }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField variant="outlined" id="answerMeaning" label="Answer meaning" 
                            sx={{input: {textAlign: "center"}}}
                            size="small"
                            inputRef={answerMeaningInput}
                            value={answerMeaning}
                            onChange={(event) => setAnswerMeaning(event.target.value)}
                            onKeyDown={handlePressEnter}
                        />
                    </FormControl>
                </Box>

                 {/* Display quit button */}
                <Button
                    onClick={() => (navigator(-1))}
                    variant="contained"
                    color="error"
                    size="small" 
                    sx={{ borderRadius: '30px', px: 2, mr: 1 }}
                > Quit </Button>
                
                {/* Display next question button */}
                { !isCorrectAnswer && <Button onClick={handleGiveUp}
                    sx={{ borderRadius: '30px', px: 2, my: 2 }} 
                    size="small" 
                    variant="contained" 
                    >
                    Give up
                </Button>}
                { isCorrectAnswer && <Button onClick={handleNextQuestion}
                    sx={{ borderRadius: '30px', px: 2, my: 2 }} 
                    size="small" 
                    variant="contained" 
                    >
                    Next Question
                </Button>}

            </Paper>
        </Box>
    </React.Fragment>)
}
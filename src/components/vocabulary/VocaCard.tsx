import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import React from "react"
import Vocabulary from "../../interfaces/Vocabulary"
import { AppDispatch } from "../../stores/store"
import { useDispatch } from "react-redux"
import { deleteVoca, updateEditVoca } from "../../stores/slices/vocaSlice"
import { useNavigate } from "react-router-dom"
import { alertConfirmDelete } from "../../utils/SweetAlert"
import { VolumeUp } from "@mui/icons-material"

type VocaCardProps = {
    voca: Vocabulary|null
}

declare global {
    interface Window {
        responsiveVoice?: any;
    }
}

export const VocaCard = ({voca }: VocaCardProps) => {

    // variable
    const navigate = useNavigate();

    //redux
    const dispatch: AppDispatch = useDispatch();

    
    // function
    const callbackConfirmDeleteVoca = (isConfirm: boolean) => {
        if(isConfirm){
            const id = voca?.id || "";
            dispatch(deleteVoca(id));
        }
    }
    
    const handleDeleteVoca = () => {
        const word = voca?.word || "";
        alertConfirmDelete(word, callbackConfirmDeleteVoca)
    }

    const handleEditVoca = () => {
        dispatch(updateEditVoca(voca));
        navigate('new-voca');
    }

    const handleSpeakVoca = () => {
        const word = voca?.word.toString();

        const msg = new SpeechSynthesisUtterance(word);
        msg.rate = 0.5;
        window.speechSynthesis.speak(msg);
        //window.responsiveVoice.speak(word, "US English Female", {volume: 0.8, rate: 0.5});
    }

    return (
        <React.Fragment>
            <Card sx={{ boxShadow: '0 0 6px #008DDA', borderRadius: '20px', px: 1 }}>

                {/* Display vocabulary fields */}
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word from {voca?.groupName? '"' + voca.groupName + '" group' : 'All'}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h5">
                            {voca?.word}
                        </Typography>

                        { voca && voca.word && <Button onClick={handleSpeakVoca}>
                            <VolumeUp />
                        </Button> }
                    </Box>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {voca?.type}
                    </Typography>
                    <Typography variant="body2">
                        <b>Meaning: </b>
                        {voca?.meaning}
                        <br />
                        <b>Example: </b>
                        {voca?.example}
                    </Typography>
                </CardContent>

                { voca?.id && <CardActions>
                    <Button onClick={handleDeleteVoca} size="small">
                        Delete
                    </Button>
                    <Button onClick={handleEditVoca} size="small">
                        Edit
                    </Button>
                </CardActions>}
            </Card>
        </React.Fragment>
    )
}
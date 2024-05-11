import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import React, { useRef } from "react"
import Vocabulary from "../../interfaces/Vocabulary"
import { AppDispatch } from "../../stores/store"
import { useDispatch } from "react-redux"
import { deleteVoca, updateEditVoca } from "../../stores/slices/vocaSlice"
import { useNavigate } from "react-router-dom"
import { alertConfirmDelete } from "../../utils/SweetAlert"
import { VolumeUp } from "@mui/icons-material"
import { speechSynthesis } from "../../utils/SpeechSynthesis"
import { CustomTooltip } from "../../utils/CustomMUI"

type VocaCardProps = {
    voca: Vocabulary|null,
    index: number
}


export const VocaCard = ({voca, index }: VocaCardProps) => {

    // variable
    const navigate = useNavigate();
    
    // blue, green, pink, purple, red, orange, green cold, light brown, gray, dark pink, light orange, dark blue
    const colors = useRef(['#008DDA', '#41B06E', '#FF76CE', '#7469B6', '#C40C0C', 
    '#FFC100', '#135D66', '#AF8260', '#607274', '#C23373', '#FFAF45', '#387ADF']);

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
        const word = voca?.word.toString() || "";

        speechSynthesis(word);
    }

    return (
        <React.Fragment>
            <Card sx={{ boxShadow: `0 0 9px ${colors.current[index]}`, borderRadius: '20px', height: '255px' }}>

                {/* Display vocabulary fields */}
                <CardContent>
                    <Typography noWrap={true} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
                    <Typography variant="body2" component="div">

                        {/* Display meaning field */}
                        <b>Meaning: </b>
                        <CustomTooltip title={voca?.meaning}>
                            <Typography variant="body2" noWrap={true}>{voca?.meaning}</Typography>
                        </CustomTooltip>
                        
                        {/* Display example field */}
                        <b>Example: </b>
                        <CustomTooltip title={voca?.example}>
                            <Typography variant="body2" noWrap={true}>{voca?.example}</Typography>
                        </CustomTooltip>

                    </Typography>
                </CardContent>

                {/* Display Delete & Edit button */}
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
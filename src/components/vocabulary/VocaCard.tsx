import { Box, Button, Card, CardActions, CardContent, Tooltip, Typography } from "@mui/material"
import React from "react"
import Vocabulary from "../../interfaces/Vocabulary"
import { AppDispatch } from "../../stores/store"
import { useDispatch } from "react-redux"
import { deleteVoca, updateEditVoca } from "../../stores/slices/vocaSlice"
import { useNavigate } from "react-router-dom"
import { alertConfirmDelete } from "../../utils/SweetAlert"
import { VolumeUp } from "@mui/icons-material"
import { SpeechSynthesis } from "../../utils/SpeechSynthesis"

type VocaCardProps = {
    voca: Vocabulary|null
}

// const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
//     <Tooltip {...props} classes={{ popper: className }} />
//   ))({
//     [`& .${tooltipClasses.tooltip}`]: {
//       maxWidth: 300,
//     },
//   });

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
        const word = voca?.word.toString() || "";

        SpeechSynthesis(word);
    }

    return (
        <React.Fragment>
            <Card sx={{ boxShadow: '0 0 6px #008DDA', borderRadius: '20px', px: 1, height: '250px' }}>

                {/* Display vocabulary fields */}
                <CardContent>
                    <Tooltip title={voca?.groupName ? voca.groupName : 'All'} 
                        placement="top-end"
                        slotProps={{ 
                            popper: { modifiers: [{
                                name: 'offset',
                                options: {offset: [0, -14]}
                            }]},
                        }}
                    >
                        <Typography noWrap={true} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word from {voca?.groupName? '"' + voca.groupName + '" group' : 'All'}
                        </Typography>
                    </Tooltip>
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
                        <b>Meaning: </b>
                        {voca?.meaning}
                        <br />
                        <b>Example: </b>
                        <Tooltip title={voca?.example} 
                            placement="bottom-start"
                            slotProps={{ 
                                popper: { modifiers: [{
                                    name: 'offset',
                                    options: {offset: [0, -14]}
                                }]},
                            }}
                        >
                            <Typography variant="body2" noWrap={true}>{voca?.example}</Typography>
                        </Tooltip>
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
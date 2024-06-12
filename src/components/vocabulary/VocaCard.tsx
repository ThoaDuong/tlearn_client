import React from "react"
import { Box, Button, Divider, Typography } from "@mui/material"
import Vocabulary from "../../interfaces/Vocabulary"
import { AppDispatch } from "../../stores/store"
import { useDispatch } from "react-redux"
import { deleteVoca, updateEditVoca } from "../../stores/slices/vocaSlice"
import { useNavigate } from "react-router-dom"
import { alertConfirmDelete } from "../../utils/SweetAlert"
import { Delete, Edit, VolumeUp } from "@mui/icons-material"
import { speechSynthesis } from "../../utils/SpeechSynthesis"


type VocaCardProps = {
    voca: Vocabulary|null
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
        const word = voca?.word.toString() || "";

        speechSynthesis(word);
    }

    return (
        <React.Fragment>
            {/* Parent Container */}
            <Box sx={{
                border: '1px solid #373A40',
                height: '300px',
                borderRadius: '20px', 
                position: 'relative',
                overflow: 'hidden',
                bgcolor: '#e7f4f4',
            }}>
                {/* Top | Voca Content */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    zIndex: 1,
                    padding: '18px 18px 18px 0',
                    borderRadius: '20px',
                    height: '100%',
                    width: '100%',
                    overflowY: 'scroll',
                    right: '-18px', /* to hidden scrollbar | 18px */
                }}>

                    {/* Display group name */}
                    <Typography component="span" sx={{
                        bgcolor: '#49afa9',
                        color: 'white',
                        border: '1px solid #373A40',
                        fontSize: 10,
                        px: 1.5, py: 0.5,
                        borderRadius: '20px'
                    }}>
                        {voca?.groupName? voca.groupName : 'All'}
                    </Typography>

                    {/* Display voca word + speak volumn */}
                    <Box sx={{ display: 'flex', mt: 1}}>
                        <Typography component="h3" sx={{
                            fontWeight: '600',
                            fontSize: 26,
                        }}>
                            {voca?.word}
                        </Typography>

                        { voca && voca.word && <Button 
                            sx={{ mt: 0.25, color: '#49afa9' }}
                            onClick={handleSpeakVoca}
                        >
                            <VolumeUp />
                        </Button> }

                    </Box>

                    {/* Display type */}
                    <Typography sx={{ fontSize: 14, mt: 0 }}>
                        / {voca?.type} /
                    </Typography>

                    {/* Display meaning */}
                    <Typography sx={{ fontWeight: '500', mt: 1 }}>
                        {voca?.meaning}
                    </Typography>

                    {/* Display example */}
                    <Typography sx={{ fontSize: 14, fontStyle: 'italic', mt: 1 }}>
                        Ex: {voca?.example}
                    </Typography>

                    {/* Hidden block */}
                    <Typography sx={{ mb: 7, visibility: 'hidden' }}></Typography>
                </Box>

                {/* Bottom | Divider White Background */}
                <Box sx={{
                    position: 'absolute',
                    top: '85%',
                    // top: '80%',
                    zIndex: 2,
                    width: '100%',
                    height: '60px',
                    bgcolor: 'white',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                }}>
                    <Divider sx={{ bgcolor: '#373A40' }}/>
                </Box>

                {/* Bottom | Edit + Delete Button */}
                { voca?.id && <Box sx={{
                    position: 'absolute',
                    top: '85%',
                    // top: '90%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3
                    }}>
                        <Box>
                            <Typography component="button" sx={{ 
                                bgcolor: '#fa8b8b',
                                color: 'white',
                                border: '1px solid #373A40', 
                                borderRadius: '50%',
                                p: '5px 10px',
                                fontSize: 16,
                                mr: 0.5,
                                '&:hover': {
                                    bgcolor: '#ccc',
                                    cursor: 'pointer'
                                }
                            }}
                                onClick={handleDeleteVoca}
                            >
                                <Delete sx={{ mt: 0.6, fontSize: 'inherit' }}/>
                            </Typography>
                            <Typography component="button" sx={{ 
                                bgcolor: '#fa8b8b',
                                color: 'white',
                                border: '1px solid #373A40', 
                                borderRadius: '50%',
                                p: '5px 10px',
                                fontSize: 16,
                                ml: 0.5,
                                '&:hover': {
                                    bgcolor: '#ccc',
                                    cursor: 'pointer'
                                }
                            }}
                                onClick={handleEditVoca}
                            >
                                <Edit sx={{ mt: 0.6, fontSize: 'inherit' }}/>
                            </Typography>
                        </Box>
                </Box>}
            </Box>


        </React.Fragment>
    )
}
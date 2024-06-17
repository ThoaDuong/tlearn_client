import { Delete, Edit } from "@mui/icons-material"
import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import React from "react"
import { Writing } from "../../interfaces/Writing"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../stores/store"
import { deleteWritingByID, setEditWritingObject } from "../../stores/slices/writingSlice"
import { alertConfirmDelete } from "../../utils/SweetAlert"
import { useNavigate } from "react-router-dom"
import { MultilineTruncate } from "../../utils/CustomMUI"

type WritingCardProps = {
    writingItem: Writing
}

export const WritingCard = ({ writingItem }: WritingCardProps) => {

    //variable
    const navigate = useNavigate();

    // redux
    const dispatch: AppDispatch = useDispatch();

    // function
    const callbackConfirmDeleteWriting = (isConfirm: boolean) => {
        if(isConfirm){
            dispatch(deleteWritingByID(writingItem.id));
        }
    }

    // delete writing
    const handleDeleteWriting = () => {
        alertConfirmDelete(writingItem.title, callbackConfirmDeleteWriting)
    }

    // edit writing
    const handleEditWriting = () => {
        dispatch(setEditWritingObject(writingItem));
        navigate('new');
    }

    return (<React.Fragment>

            <Box sx={{
                border: '1px solid var(--black)',
                height: '170px',
                borderRadius: '20px', 
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'var(--light-beige)',
            }}>
                {/* Top | Voca Content */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    zIndex: 1,
                    color: 'var(--black)',
                    padding: 2,
                    borderRadius: '20px',
                    height: '100%',
                    width: '100%',
                }}>

                    {/* Display meaning */}
                    <Typography component="h3" noWrap={true} sx={{
                            fontWeight: '600',
                            fontSize: 22,
                        }}>
                            {writingItem.title}
                        </Typography>
                    <Typography noWrap={true} sx={{ fontWeight: '500', fontSize: 12, }}>
                        
                    </Typography>

                    <MultilineTruncate text={writingItem.content} line={2} />

                    {/* Hidden block */}
                    <Typography sx={{ mb: 7, visibility: 'hidden' }}></Typography>
                </Box>

                {/* Bottom | Divider and Background */}
                <Box sx={{
                    position: 'absolute',
                    top: '75%',
                    zIndex: 2,
                    width: '100%',
                    height: '60px',
                    bgcolor: 'var(--light-pink)',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                }}>
                    <Divider sx={{ bgcolor: 'var(--black)' }}/>
                </Box>

                {/* Bottom | Edit + Delete Button */}
                <Box sx={{
                    position: 'absolute',
                    top: '75%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3
                    }}>
                        <Box>
                            <Typography component="button" className="voca-action-btn" sx={{ mr: 0.5 }}
                                onClick={handleDeleteWriting}
                            >
                                <Delete sx={{ mt: 0.6, fontSize: 'inherit' }}/>
                            </Typography>
                            <Typography component="button" className="voca-action-btn" sx={{ ml: 0.5 }}
                                onClick={handleEditWriting}
                            >
                                <Edit sx={{ mt: 0.6, fontSize: 'inherit' }}/>
                            </Typography>
                        </Box>
                </Box>
            </Box>



        {/* <Card sx={{
            boxShadow: `0 0 6px pink`, 
            borderRadius: '20px', 
            px: 1, 
            borderTop: '10px solid pink',
            borderBottom: '10px solid pink',
            position: 'relative',
        }}>
            <CardContent sx={{ textAlign: 'left', pb: 7,
                '&:hover': {
                    cursor: 'pointer'
                }
             }}>
                <Typography variant="h6" noWrap={true}>
                    { writingItem.title }
                </Typography>
                <Typography variant="body1" noWrap={true}> 
                    { writingItem.content }
                </Typography>
            </CardContent>

            <CardActions sx={{
                position: 'absolute', 
                bottom: '-25%', 
                zIndex: 2, 
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <Button size="small" sx={{
                    borderRadius: '50%', 
                    p: 1,
                    minWidth: '50px',
                    border: '3px solid pink',
                    bgcolor: 'white',
                    '&:hover': {
                        backgroundColor: '#CAF4FF',
                        color: '#074173',
                    }
                }}
                    onClick={handleDeleteWriting}
                >
                    <Delete/>
                </Button>
                <Button size="small" sx={{
                    borderRadius: '50%', 
                    p: 1,
                    minWidth: '50px',
                    border: '3px solid pink',
                    bgcolor: 'white',
                    '&:hover': {
                        backgroundColor: '#CAF4FF',
                        color: '#074173',
                    }
                }}
                    onClick={handleEditWriting}
                >
                    <Edit/>
                </Button>
            </CardActions>
        </Card> */}
    </React.Fragment>)
}
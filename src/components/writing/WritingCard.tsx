import { Delete, Edit } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import React from "react"
import { Writing } from "../../interfaces/Writing"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../stores/store"
import { deleteWritingByID, setEditWritingObject } from "../../stores/slices/writingSlice"
import { alertConfirmDelete } from "../../utils/SweetAlert"
import { useNavigate } from "react-router-dom"

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
        <Card sx={{
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
        </Card>
    </React.Fragment>)
}
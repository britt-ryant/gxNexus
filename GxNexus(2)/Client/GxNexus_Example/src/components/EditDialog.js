import { Button, Dialog, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';



 const EditDialog = (props) => {
    const selectedData = useSelector(state => state.files.clickedExistingData);
    const selectedId = useSelector(state => state.files.clickedEntryId);
    const inputType = useSelector(state => state.files.inputType)

    const handleOnChange = (event) => {
        props.handleChange(event.target.value)
    }
    return(
        <Dialog 
                open={props.clicked}
                onClose={props.handleClose}
                fullWidth>
            <Paper>
                <Typography sx={{margin: 3}}>Change Selected Data For {selectedId}</Typography> 
                <Typography>Change Selected Cell</Typography>
                <Typography>Existing cell data: {selectedData}</Typography>
                <Box sx={{border: 0.5, marginTop: 2, p: 1}}>
                    <InputLabel>Enter Data</InputLabel>
                    {inputType === "string" ? <OutlinedInput type='text' defaultValue={selectedData} onChange={(e) => handleOnChange(e)}/>
                     : <OutlinedInput type='number'defaultValue={selectedData} onChange={(e) => handleOnChange(e)} />}
                    <Button variant='contained' onClick={() => props.handleUpdate()}>Update</Button>
                </Box>
            </Paper>
        </Dialog>
    )

}


export default EditDialog
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const serverUrl = 'http://localhost:5000';

export const addDeletedEntry = createAsyncThunk(
    'trace/deletedEntry',
    async(payload) => {
        console.log(payload.entry, payload.tableName)
        const response = await fetch(`${serverUrl}/trace/deletedEntry`, 
        {
            method: "POST",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({entry: payload.entry, tablename: payload.tableName})
        });
        if(response.ok){
            console.log(response)
            return ({response: response, message: 'Data was posted to the deletion table, entry was deleted successfully'})
        } else {
            return ({error: true, message: `Trouble posting to the trace table for deletion`})
        }
    }
)


const initialState = {
    trackingEntry: {},
    trackTableName: ""
};



export const trackingSlice = createSlice({
    name: "tracking",
    initialState,
    reducers: {
        setTrackingTableName: (state, action) => {
            state.trackTableName = `${action.payload}_trace`;
        },
        setTrackingEntry: (state, action) => {
            state.trackingEntry = action.payload;
        }
    }
});


export const {setTrackingTableName, setTrackingEntry} = trackingSlice.actions;
export default trackingSlice.reducer;



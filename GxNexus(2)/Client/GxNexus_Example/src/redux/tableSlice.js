import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getDataByAssessmentName = createAsyncThunk(
    'data/getDataByAssessmentName',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/data/get/${payload.tableName}/${payload.assessmentName}`)
        if(response.ok){
            console.log(response);
            const data = await response.json();
            return data
        } else {
            console.log(`there was an error in the table get`)
        }
    }
)


const initialState = {
    currentPool: "",
    inputData: "",
    error: false,
    errorMessage: "",
    renderBarGraph: false,
    assessmentScore: false,
    assessmentScoreData: []
};


export const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        renderBarGraph: (state, action) => {
            state.renderBarGraph = !state.renderBarGraph;
        },
        sortAssignmentScoreData: (state, action) => {
        //     state.assessmentScoreData = [];
        //     action.payload.forEach(element => {
        //         if (element.AssessmentScore){
        //             let newElement = {
        //                 name: `${element.FirstName} ${element.LastName}`,
        //                 score: element.AssessmentScore
        //             }
        //             state.assessmentScoreData.push(newElement);
                
        //         } else {
        //             state.error = true;
        //             state.errorMessage = 'Could Not Find assessment score statistic in Excel Sheet to render this chart'
        //             return
        //         }
        //     });
        //     state.assessmentScore = true;
        },
        setGenerateInputData: (state, action) => {
            state.inputData = action.payload;
        }
        
    },
    extraReducers: {
        [getDataByAssessmentName.pending]: (state, action) => {
            console.log(`getting data by assessment name`)
        },
        [getDataByAssessmentName.fulfilled]: (state, action) => {
            state.assessmentScoreData = [];
            action.payload[0].forEach(element => {
                if (element.AssessmentScore){
                    let newElement = {
                        name: `${element.FirstName} ${element.LastName}`,
                        score: element.AssessmentScore
                    }
                    state.assessmentScoreData.push(newElement);
                
                } else {
                    state.error = true;
                    state.errorMessage = 'Could Not Find assessment score statistic in Excel Sheet to render this chart'
                    return
                }
            });
            state.assessmentScore = true;
        }
    }
})


export const {renderBarGraph, sortAssignmentScoreData, setGenerateInputData} = tableSlice.actions;
export default tableSlice.reducer;
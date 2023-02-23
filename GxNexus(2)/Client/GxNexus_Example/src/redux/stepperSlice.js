import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    activeStep: 0,
    completed: {},
    steps: ["Import Excel Data", "Edit Data", "Generate PDF", "Export PDF"]
};



export const stepperSlice = createSlice({
    name: "stepper",
    initialState,
    reducers: {
        activeStepFwdReducer: (state, action) => {
            state.activeStep = state.activeStep + 1;
        }, 
        activeStepBackReducer: (state, action) => {
            state.activeStep = state.activeStep - 1;
        },
        completedStepReducer: (state, action) => {
            let newCompletedStep = state.completed;
            newCompletedStep[state.activeStep] = true;
            state.completed = newCompletedStep;
        },
        resetStateReducer: (state, action) => {
            return {...initialState}
        }
    }
});

export const {activeStepFwdReducer, activeStepBackReducer, completedStepReducer, resetStateReducer} = stepperSlice.actions;
export default stepperSlice.reducer;
import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
} from "@mui/material";
import "../App.css";
import App from "../App.js";
import Excel from "../StepperComponents/Steps/ExcelImport";
import { useDispatch, useSelector } from "react-redux";


//import stepper reducers
import {activeStepFwdReducer, activeStepBackReducer, completedStepReducer, resetStateReducer} from '../redux/stepperSlice';
import ExcelImport from "../StepperComponents/Steps/ExcelImport";
import GetTableData from "../components/GetTableData";
import DThreeComp from "../components/DThreeComp";
import { getDataByAssessmentName, setGenerateInputData} from "../redux/tableSlice";


// const steps = [
//   "Import Excel Document",
//   "Edit Data",
//   "Generate PDF",
//   "Export PDF",
// ];

// const stepDescription = [
//   <Excel />,
//   <App />,
//   "This step generates the pdf",
//   "This step you would verify data and export pdf",
// ];

const ProgressStepper = () => {
  const tableName = useSelector((state) => state.files.tableName);
  const steps = useSelector((state) => state.stepper.steps);
  const activeStep = useSelector((state) => state.stepper.activeStep);
  const completed = useSelector((state) => state.stepper.completed);

  const dispatch = useDispatch();




  // const [activeStep, setActiveStep] = useState(0);
  // const [completed, setCompleted] = useState({});

  const totalSteps = steps.length;
  const completedSteps = Object.keys(completed).length;
  const allStepsCompleted = completedSteps === totalSteps;

  const handleBack = () => {
    dispatch(activeStepBackReducer());
  };

  const handleNext = () => {
    dispatch(completedStepReducer());
    dispatch(activeStepFwdReducer());
  };

  const handleReset = () => {
    dispatch(resetStateReducer());
  };

  const renderPages = () => {
    switch(activeStep){
      case 0: 
        return <ExcelImport />
      case 1: 
        return <GetTableData />
      case 2: 
        return  <DThreeComp print={false}/>
      case 3: 
        return <DThreeComp print={true} />
      default: 
        console.log(`There was an error in the switch statement`)
    }
  }

  return (
    <div className="Progress-stepper">
      <Stepper activeStep={activeStep} sx={{p: 5}}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted ? (
          <>
            <Typography sx={{ mt: 2, mb: 1, color: "black" }}>
              All Steps Completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </>
        ) : (
          <>
            {/* <Typography sx={{ mt: 2, mb: 1, color: "black" }}>
              {stepDescription[activeStep]}
            </Typography> */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Box sx={{ flex: "1 1 auto" }} />
              {renderPages()}
              <Button onClick={handleNext}>Next</Button>
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressStepper;
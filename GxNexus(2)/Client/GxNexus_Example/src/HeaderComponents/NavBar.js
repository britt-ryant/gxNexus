import React from "react";
import { AppBar, Box, Button, Typography } from "@mui/material";
import ExcelImport from "../StepperComponents/Steps/ExcelImport";
import { useDispatch, useSelector } from "react-redux";
import {renderFile} from '../redux/fileUploadSlice';
import ProgressStepper from '../StepperComponents/ProgressStepper';

const tabs = ["Upload", "Generate Report", "View Reports"];

export default function NavBar() {
  const render = useSelector(state => state.files.renderData)
  const dispatch = useDispatch();

return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "#00294d",
          display: "flex",
          flexDirection: "row",
          gap: 3,
        }}
      >
        {tabs.map((tab) => (
          tab === "Upload" ? <Button key={tab} sx={{ color: "white" }} onClick={() => dispatch(renderFile())}>{tab}</Button> : <Button key={tab} sx={{ color: "white" }}>
          {tab}
        </Button>
        ))}
      </AppBar>
      <ProgressStepper />
      {/* {
        render ? <ExcelImport /> : null
      } */}
    </Box>
  )
}


import React, { useState } from "react";
import {
  fileUpload,
  storeTableName,
  storeColumnNames,
  getTableData,
  hideTables
} from "../redux/fileUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { PURGE } from "redux-persist";
import { Button, Box, OutlinedInput } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import GetTableData from "./GetTableData";
import { setTrackingTableName } from "../redux/trackingSlice";
import DThreeComp from "./DThreeComp";
import { getDataByAssessmentName, renderBarGraph, setGenerateInputData } from "../redux/tableSlice";

const original_url = "http://localhost:5000";

const Home = () => {
  const dataTableName = useSelector((state) => state.files.tableName);
  const fileUploaded = useSelector((state) => state.files.fileUploaded);
  const data = useSelector((state) => state.files.uploadedTableData);
  const tableGenerated = useSelector((state) => state.table.inputData)
  const renderAssessmentBar = useSelector(state => state.table.renderBarGraph)
  const [inputData, setInputData] = React.useState("");
  const dispatch = useDispatch();

React.useEffect(() => {
  if(tableGenerated){
    console.log(`calling`)
    dispatch(getDataByAssessmentName({tableName: dataTableName, assessmentName: tableGenerated}))
  }
  }, [data])

  const HandleFileUpload = (e) => {
    const tempFile = e.target.files[0];

    const formData = new FormData();
    formData.append("myfile", tempFile);

    Axios.post(`${original_url}/excel/upload`, formData)
      .then((res) => {
        console.log(res)
        dispatch(fileUpload({ file: tempFile }));
        //dispatch(getTableData(res.data.tableName))
        return {tableName: res.data.tableName, columns: res.data.columns}
      }).then((data) => {
        console.log(data)
       // dispatch(getTableData(data.tableName))
        dispatch(storeTableName(data.tableName));
        dispatch(storeColumnNames(data.columns));
        // dispatch(setTrackingTableName(res.data.tableName))
      })
  };

  const HandleGetBtn = () => {
    dispatch(hideTables());
  };
  const refreshGet = () => {
    dispatch(getTableData(dataTableName))
  }

  const handlePurge = () => {
    dispatch({
      type: PURGE,
      key: "root",
      result: () => null,
    });
  };

  const handleGenTable = () => {
    //console.log(inputData);
    dispatch(setGenerateInputData(inputData));
    dispatch(getDataByAssessmentName({tableName: dataTableName, assessmentName: inputData}))
    dispatch(renderBarGraph(true))
  }

  const handleChange = (event) => {
    setInputData(event.target.value)
  } 

  return (
    <div>
      <div>
        <label style={{marginRight: 20}}>Import Excel Sheet</label>
        <Button
          variant="outlined"
          startIcon={<FileUploadOutlinedIcon />}
          component="label"
          sx={{ marginRight: 6 }}
        >
          Upload
          <input type="file" onChange={HandleFileUpload} hidden />
        </Button>
        <Button variant="outlined" sx={{marginLeft: 10, alignSelf:'right'}} onClick={handlePurge}>Purge</Button>
      </div>
      <div>
      <Button variant="contained" sx={{marginTop: 3}} onClick={HandleGetBtn}>Render Table</Button>
      <Button variant="contained" sx={{marginTop: 3}} onClick={refreshGet}>Get Table</Button>
      <Box sx={{margin: 5}}>
      <OutlinedInput type="text" onChange={(e) => handleChange(e)} />
      <Button variant="contained" sx={{marginTop: 3}} onClick={handleGenTable}>Generate Assessment Score Table</Button>
      </Box>
      {
        fileUploaded ? <GetTableData /> : null
      }
      {dataTableName && renderAssessmentBar ? <DThreeComp /> : null}
      </div>
    </div>
  );
};

export default Home;

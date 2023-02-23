import React, { useState } from "react";
import "../../App.css";
import { Paper, Button } from "@mui/material";
import GetTableData from "../../components/GetTableData";
import DThreeComp from '../../components/DThreeComp';
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { PURGE } from "redux-persist";
import {
  fileUpload,
  storeTableName,
  storeColumnNames,
  getTableData,
  renderTable,
} from "../../redux/fileUploadSlice";

import { setGenerateInputData, getDataByAssessmentName, renderBarGraph} from '../../redux/tableSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EXTENSION = ["xlsx", "xls", "csv"];

const original_url = "http://localhost:5000";

const getExtensions = (file) => {
  const parts = file.name.split(".");
  const extensions = parts[parts.length - 1];
  return EXTENSION.includes(extensions);
};

const ExcelImport = () => {
  const dataTableName = useSelector((state) => state.files.tableName);
  const fileUploaded = useSelector((state) => state.files.fileUploaded);
  const showTable = useSelector((state) => state.files.renderTable);
  const showBarGraph = useSelector((state) => state.table.renderBarGraph);

  const dispatch = useDispatch();

  const HandleFileUpload = (e) => {
    const tempFile = e.target.files[0];
    if (tempFile) {
      if (getExtensions(tempFile)) {
        const formData = new FormData();
        formData.append("myfile", tempFile);

        Axios.post(`${original_url}/excel/upload`, formData)
          .then((res) => {
            dispatch(fileUpload({ file: tempFile }));
            toast.success("Excel file Uploaded", {
              position: toast.POSITION.TOP_CENTER,
              className: "toast-message",
            });
            dispatch(storeTableName(res.data.tableName));
            dispatch(storeColumnNames(res.data.columns));
          })
          .catch((err) => console.log(err));
      } else {
        toast.error("Invalid file input, Select Excel, CSV file", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      console.log("No file uploaded");
    }
  };

  const handleGetTableData = () => {
    dispatch(getTableData(dataTableName)).then((res) => {
      dispatch(renderTable());
    });
  };

  const generateBarGraph = () => {
    const inputData = "ReduxTest"
    dispatch(getDataByAssessmentName({tableName: dataTableName, assessmentName: inputData})).then((res) => {
      dispatch(setGenerateInputData(inputData));
      dispatch(renderTable())
    }).then((res) => {
      console.log(`I can do this`);
      dispatch(renderBarGraph())
    })
  }

  const handlePurge = () => {
    dispatch({
      type: PURGE,
      key: "root",
      result: () => null,
    });
  };

  return (
    <div>
      <Paper
        style={{
          // height: '100vh',
          margin: "auto",
          width: "90vw",
          marginBottom: "1%",
          marginTop: "1%",
          paddingLeft: "1%",
          paddingRight: "1%",
          paddingBottom: "5%",
          paddingTop: "1%",
        }}
        elevation={5}
      >
        {!showBarGraph ? <input type="file" onChange={(e) => HandleFileUpload(e)} /> : null}
        {/* {fileUploaded ? <Button variant="contained" onClick={() => handleGetTableData()}>GetTableData</Button> : null} */}
        <Button variant="contained" onClick={() => handlePurge()}>Purge</Button>
        {/* {showTable ? <Button variant="contained" onClick={generateBarGraph}>Generate Assessment Score Data Graph</Button>: null} */}
        <ToastContainer />
        {/* <div
          style={{
            marginTop: "1%",
            display: "flex",
            justifyContent: "center",
            height: 500,
          }}
        > */}
          {/* {showTable ? <GetTableData /> : null}
          {!showTable && showBarGraph ? <DThreeComp /> : null} */}
        {/* </div> */}
      </Paper>
    </div>
  );
};

export default ExcelImport;
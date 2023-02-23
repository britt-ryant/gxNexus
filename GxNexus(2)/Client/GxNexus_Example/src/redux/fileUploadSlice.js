import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getTableData = createAsyncThunk(
    'data/getTableInfo',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/data/${payload}`)
        if(response.ok){
            console.log(`Table successfully loaded`)
        }
        const tableData = await response.json();
        console.log(tableData[0])
        return tableData[0];
    }
);

export const updateTableInfo = createAsyncThunk(
    'data/updateData',
    async(payload) => {

        const response = await fetch(`http://localhost:5000/data/update`,
        {
            method: "PUT",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify({data: payload})
        })
        if(response.ok){
            let newInfo = await response.json();
            console.log(newInfo)
        }
    }
)

export const deleteEntry = createAsyncThunk(
    'data/deleteEntry',
    async(payload) => {
        const response = await fetch(`http://localhost:5000/data/${payload.tableName}/${payload.id}`)
        if(response.ok){
            let answer = await response.json();
            return {response: answer, index: payload.index}
        }
    }
)

const initialState = {
    fileUploaded: false,
    renderData: false,
    renderTable: false,
    file: null,
    tableName: "",
    uploadedTableData: [],
    columnName: [],
};


export const fileUploadSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        fileUpload: (state, action) => {
            //console.log(action.payload.file)
                state.file = action.payload.file;
                state.fileUploaded = true

        },
        storeTableName: (state, action) => {
            state.tableName = action.payload;
          },
          storeColumnNames: (state, action) => {
            console.log(`in store column name`)
            let columns = action.payload;
            columns.map((element) => {
              // return state.columnName[element] = true;
              if(element !== "Id" || element !== "Timestamp"){
                state.columnName.push({field: element, headerName: element, width: 100, editable: true})
              }
            });
          },
          storeClickedColumnName: (state, action) => {
            state.clickedColumnName = action.payload.clickedCol;
            state.clickedExistingData = action.payload.entryData;
            state.clickedEntryId = action.payload.id;
            // state.clickedColumnName = action.payload;
          },
          hideTables: (state, action) => {
            state.fileUploaded = !state.fileUploaded;
          },
          renderFile: (state, action) => {
            state.renderData = !state.renderData;
          },
          handleStateDelete: (state, action) => {
            console.log(state.uploadedTableData, action.payload);
            state.uploadedTableData.splice(action.payload, 1);
          },
          storeInputType: (state, action) => {
            state.inputType = typeof action.payload;
          },
          renderTable: (state, action) => {
            state.renderTable = true;
          }
        },
        extraReducers: {
            [getTableData.fulfilled]: (state, action) => {
              state.uploadedTableData = action.payload;
              state.fileUploaded = true;
            },
            [deleteEntry.pending]: (state, action) => {
                console.log(`deleting entry...`)
            },
            [deleteEntry.fulfilled]: (state, action) => {
                //console.log(action.payload)
                state.uploadedTableData.splice(action.payload.index, 1);
            }
          },
        });
        
        export const { fileUpload, storeTableName, storeColumnNames, storeClickedColumnName, hideTables, handleStateDelete, storeInputType, renderTable, renderFile} =
          fileUploadSlice.actions;
        export default fileUploadSlice.reducer;
        
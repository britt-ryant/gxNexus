import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntry, getTableData, handleStateDelete, storeClickedColumnName, storeInputType, updateTableInfo, renderTable } from "../redux/fileUploadSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button, Box} from '@mui/material'
import Delete from "./Delete";
import EditDialog from "./EditDialog";
import { addDeletedEntry, setTrackingEntry} from "../redux/trackingSlice";
import {DataGrid} from '@mui/x-data-grid';
// import { Box } from "@mui/system";

const GetTableData = () => {
  const tableName = useSelector((state) => state.files.tableName)
  const trackTableName = useSelector((state) => state.tracking.trackTableName)
  const columns = useSelector((state) => state.files.columnName);
  const rows = useSelector((state) => state.files.uploadedTableData);
  const showTable = useSelector((state) => state.files.renderTable);

  
  // const [renderDelete, setRenderDelete] = React.useState(false);
  // const [clicked, setClicked] = React.useState(false);
  // const [updateObj, setUpdateObj] = React.useState()


  const dispatch = useDispatch();

  React.useEffect(() => {
      dispatch(getTableData(tableName)).then((res) => {
        dispatch(renderTable());
      });
  }, [])


  // const handleCellClick = (i, entry, itemId) => {
  //   const clickedCol = Object.keys(columns)[i];
  //   let inputData = {
  //     clickedCol: clickedCol,
  //     entryData: entry,
  //     id: itemId
  //   };
  //   console.log(inputData)
  //   setUpdateObj({
  //     id: itemId,
  //     column: clickedCol,
  //     tableName: tableName
  //   })
  //   dispatch(storeClickedColumnName(inputData))
  //   dispatch(storeInputType(entry))
  //   setClicked(true)
  // }

  // const handleInputChange = (data) => {
  //   setUpdateObj({
  //     ...updateObj,
  //     newCellData: data
  //   })
  // }

  const editCells = (obj) => {
    const updateObj = {
      id: obj.id,
      column: obj.field,
      tableName: tableName
    };
    if(typeof obj.formattedValue === 'number'){
      const newEntry = Number(obj.value)
      updateObj.newCellData = newEntry;
      dispatch(updateTableInfo(updateObj)).then((res) => {
        dispatch(getTableData(tableName))
      }).catch((err) => console.log(err))
    } else {
      updateObj.newCellData = obj.value;
      dispatch(updateTableInfo(updateObj)).then((res) => {
        dispatch(getTableData(tableName))
      }).catch((err) => console.log(err))
    }
    
  };

  const handleRowSelection = (e) => {
    dispatch(deleteEntry({tableName: tableName, id: e[0]})).then((res) => {
      dispatch(getTableData(tableName))
    })
  }

  const handleUpdate = () => {
    dispatch(updateTableInfo(updateObj)).then((data) => {
      dispatch(getTableData(tableName))
    })
    setClicked(false)
  }

  const handleDeleteRow = (id, i, row) => {
    // dispatch(setTrackingEntry(row))
    dispatch(deleteEntry({tableName: tableName, id: id, index: i}))
    //const entry = Object.assign(...deletedEntry, {"Active": 0})
    // let keyValues = Object.entries(row);
    // keyValues.push(["Active", 0]);
    // let entry = Object.fromEntries(keyValues);
    // dispatch(addDeletedEntry({entry, tableName: trackTableName}))
 
  }

  const handleClose = () => {
    setClicked(false)
  }



  return (
    <React.Fragment>
      <Box sx={{ height: 400, width: '100%'}}>
        {showTable ? <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOption={[5]}
          onCellEditCommit={editCells}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={handleRowSelection}
          /> : null }
      </Box>
{/*       
      <TableContainer component={Paper} sx={{ border: 2, marginTop: 20 }}>
        <Table sx={{ minWidth: 70 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {renderDelete ? <TableCell></TableCell> : null}
              {Object.keys(columns).map((column, i) => {
                return <TableCell key={i}> {column}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              //console.log(row.ID, i);
              return (
                <TableRow key={i}>
                  {renderDelete ? <TableCell><Delete id={row.ID} i={i} handleDelete={(id, i) => handleDeleteRow(id, i, row)} /></TableCell> : null}
                  {Object.values(row).map((entry, i) => {
                    return <TableCell key={i} onClick={() => handleCellClick(i, entry, row.ID)}>{entry}</TableCell>
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Button onClick={() => setRenderDelete(!renderDelete)}>Click to enable Delete</Button>
      </TableContainer>
      {clicked ? <EditDialog clicked={clicked} handleChange={(data) => handleInputChange(data)} handleUpdate={() => handleUpdate()} handleClose={() => handleClose()} /> : null} */}
    </React.Fragment>
  );
};

export default GetTableData;

import * as React from 'react';
import {
  DataGrid,
  GridRowModel,
  GridColDef,
  GridRowsProp,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  MuiEvent,
  GridEditCellProps,
} from '@mui/x-data-grid';
import { log } from 'console';

// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
//   selectCount,
// } from './updatePanelSlice';
// import styles from './UpdatePanel.module.css';
// import TextField from '../../components/TextField/TextField';
// import NumberTextField from '../../components/NumberTextField/NumberTextField';

const rows: GridRowsProp = [
  {
    id: 1,
    name: 'Teeefa',
    maxDrivingDistance: 50,
    profilePictureScore: 50,
    profileDescriptionScore: 50,
  },
  {
    id: 2,
    name: 'George',
    maxDrivingDistance: 50,
    profilePictureScore: 50,
    profileDescriptionScore: 50,
  },
  {
    id: 3,
    name: 'Gohary',
    maxDrivingDistance: 50,
    profilePictureScore: 50,
    profileDescriptionScore: 50,
  },
  {
    id: 4,
    name: 'Manga',
    maxDrivingDistance: 50,
    profilePictureScore: 50,
    profileDescriptionScore: 50,
  },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 250 },
  {
    field: 'maxDrivingDistance',
    headerName: 'Max Driving Distance',
    width: 250,
    editable: true,
    type: 'number',
  },
  {
    field: 'profilePictureScore',
    headerName: 'Profile Picture Score',
    width: 250,
    editable: true,
    type: 'number',
  },
  {
    field: 'profileDescriptionScore',
    headerName: 'Profile Description Score',
    width: 250,
    editable: true,
    type: 'number',
  },
];

const UpdatePanel = () => {
  const handleProcessRowUpdate = (
    newRow: GridRowModel,
    originalRow: GridRowModel
  ) => {
    console.log('NEW', newRow);
    console.log('OLD ', originalRow);

    return originalRow;
  };
  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        {/* <DataGrid
          rows={rows}
          columns={columns}
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => console.log('ERROR: ', error)}
        /> */}
        <DataGrid
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </div>
    </div>
  );
};

export default UpdatePanel;

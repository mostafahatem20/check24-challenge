import React, { useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowModes,
  GridActionsCellItem,
  GridRowModesModel,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  cancelEditMode,
  changeRowModesModel,
  getAllCraftsmenAsync,
  openEditMode,
  saveRow,
  selectRows,
  selectRowsCount,
  selectrowModesModel,
  updateDataAsync,
} from './updatePanelSlice';

const UpdatePanel = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  const rowsState = useAppSelector(selectRows);
  const rowsModelsModeState = useAppSelector(selectrowModesModel);
  const rowsCount = useAppSelector(selectRowsCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getAllCraftsmenAsync({
        page: (paginationModel.page + 1).toString(),
        limit: paginationModel.pageSize.toString(),
      })
    );
  }, [dispatch, paginationModel]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    dispatch(openEditMode(Number(id.valueOf())));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    dispatch(saveRow(Number(id.valueOf())));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    dispatch(cancelEditMode(Number(id.valueOf())));
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(updateDataAsync(updatedRow));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    dispatch(changeRowModesModel(newRowModesModel));
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
    },
    {
      field: 'maxDrivingDistance',
      headerName: 'Max Driving Distance',
      width: 250,
      editable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      sortable: false,
    },
    {
      field: 'profilePictureScore',
      headerName: 'Profile Picture Score',
      width: 250,
      editable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      sortable: false,
    },
    {
      field: 'profileDescriptionScore',
      headerName: 'Profile Description Score',
      width: 250,
      editable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      sortable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      getActions: ({ id }) => {
        const idx = Number(id.valueOf());
        const isInEditMode =
          rowsModelsModeState[idx]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <div
      // style={{ height: 400, width: '100%' }}
      >
        <DataGrid
          rows={rowsState}
          columns={columns}
          editMode='row'
          rowModesModel={rowsModelsModeState}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          pageSizeOptions={[10]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={rowsCount}
        />
      </div>
    </div>
  );
};

export default UpdatePanel;

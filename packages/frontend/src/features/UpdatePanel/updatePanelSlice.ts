import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCraftsmen, updateData } from './updatePanelAPI';
import { initialRows } from '../../utils/constants/initialRows';
import {
  GridValidRowModel,
  GridRowModes,
  GridRowId,
  GridRowModesModel,
  GridRowModel,
} from '@mui/x-data-grid';

export interface UpdatePanelState {
  rows: readonly GridValidRowModel[];
  rowModesModel: GridRowModesModel;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UpdatePanelState = {
  rows: initialRows,
  rowModesModel: {},
  status: 'idle',
};

export const updateDataAsync = createAsyncThunk(
  'updatePanel/updateData',
  async (updatedRow: GridValidRowModel) => {
    const response = await updateData(updatedRow);
    return response.data;
  }
);

export const updatePanelSlice = createSlice({
  name: 'updatePanel',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    cancelEditMode: (state, id: PayloadAction<GridRowId>) => {
      state.rowModesModel = {
        ...state.rowModesModel,
        [id.payload]: { mode: GridRowModes.View, ignoreModifications: true },
      };

      const editedRow = state.rows.find((row: GridRowModel) => row.id === id);
      if (editedRow!.isNew) {
        state.rows = state.rows.filter((row: GridRowModel) => row.id !== id);
      }
    },

    saveRow: (state, id: PayloadAction<GridRowId>) => {
      state.rowModesModel = {
        ...state.rowModesModel,
        [id.payload]: { mode: GridRowModes.View },
      };
    },

    openEditMode: (state, id: PayloadAction<number>) => {
      state.rowModesModel = {
        ...state.rowModesModel,
        [id.payload]: { mode: GridRowModes.Edit },
      };
    },

    changeRowModesModel: (
      state,
      newRowModesModel: PayloadAction<GridRowModesModel>
    ) => {
      state.rowModesModel = newRowModesModel.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateDataAsync.pending, (state) => {
        console.log('PENDING');
        // state.status = 'loading';
      })
      .addCase(updateDataAsync.fulfilled, (state, action) => {
        console.log('SUCCESS');
        const updatedRow = action.payload;
        state.rows = state.rows.map((row: GridRowModel) =>
          row.id === updatedRow.id ? updatedRow : row
        );
      })
      .addCase(updateDataAsync.rejected, (state) => {
        console.log('REJECT');
        // state.status = 'failed';
      });
  },
});

export const { cancelEditMode, openEditMode, changeRowModesModel, saveRow } =
  updatePanelSlice.actions;

export const selectRows = (state: RootState) => state.updatePanel.rows;
export const selectrowModesModel = (state: RootState) =>
  state.updatePanel.rowModesModel;

export default updatePanelSlice.reducer;

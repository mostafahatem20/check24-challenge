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
import { GetCraftsmen } from '@not-so-software/shared';
import { getCraftsmen } from '../craftsmen/craftsmenAPI';

export interface UpdatePanelState {
  rows: readonly GridValidRowModel[];
  rowModesModel: GridRowModesModel;
  status: 'idle' | 'loading' | 'failed';
}

export interface SingleCraftsManItem {
  Craftsman_city: string;
  Craftsman_first_name: string;
  Craftsman_house_number: string;
  Craftsman_id: number;
  Craftsman_last_name: string;
  Craftsman_lat: number;
  Craftsman_lon: number;
  Craftsman_max_driving_distance: number;
  Craftsman_street: string;
  isNew: boolean;
  id: number;
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

export const getAllCraftsmenAsync = createAsyncThunk(
  'craftsmen/getCraftsmenByPostalCode',
  async (body: GetCraftsmen) => {
    const response = await getCraftsmen(body);
    console.log(response.data);

    return { page: body.page, data: response.data };
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
      })
      .addCase(getAllCraftsmenAsync.pending, (state) => {
        console.log('PENDING');
        // state.status = 'loading';
      })
      .addCase(getAllCraftsmenAsync.fulfilled, (state, action) => {
        console.log('SUCCESS');
        console.log(action.payload);

        state.rows = action.payload.data.map((item: SingleCraftsManItem) => {
          return {
            ...item,
            isNew: false,
            id: item.Craftsman_id,
            name: `${item.Craftsman_first_name} ${item.Craftsman_last_name}`,
            maxDrivingDistance: item.Craftsman_max_driving_distance,
            profilePictureScore: item.Cr
          };
        });
      })
      .addCase(getAllCraftsmenAsync.rejected, (state) => {
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

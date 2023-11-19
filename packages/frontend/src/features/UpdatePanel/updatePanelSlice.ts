import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { updateData } from './updatePanelAPI';
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
  rowsCount: number;
}

export interface SingleCraftsManItem {
  score_id: number;
  score_profile_description_score: number;
  score_profile_id: number;
  score_profile_picture_score: number;
  city: string;
  first_name: string;
  house_number: string;
  id: number;
  last_name: string;
  lat: number;
  lon: number;
  max_driving_distance: number;
  street: string;
  isNew: boolean;
  score: {
    id: number;
    profile_description_score: number;
    profile_picture_score: number;
    profile_id: number;
  };
}

export interface SingleCraftsManRow {
  name: string;
  isNew: boolean;
  id: number;
  maxDrivingDistance: number;
  profilePictureScore: number;
  profileDescriptionScore: number;
}

const initialState: UpdatePanelState = {
  rows: initialRows,
  rowModesModel: {},
  rowsCount: 0,
  status: 'idle',
};

export const selectRows = (state: RootState) => state.updatePanel.rows;
export const selectrowModesModel = (state: RootState) =>
  state.updatePanel.rowModesModel;
export const selectRowsCount = (state: RootState) =>
  state.updatePanel.rowsCount;

export const updateDataAsync = createAsyncThunk(
  'updatePanel/updateData',
  async (updatedRow: GridValidRowModel) => {
    const response = await updateData(updatedRow);
    return response.data;
  }
);

export const getAllCraftsmenAsync = createAsyncThunk(
  'updatePanel/getAllCraftsmenAsync',
  async (body: GetCraftsmen) => {
    const response = await getCraftsmen(body);

    return { page: body.page, data: response.data };
  }
);

export const updatePanelSlice = createSlice({
  name: 'updatePanel',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    cancelEditMode: (state, action: PayloadAction<GridRowId>) => {
      console.log(state.rows);
      console.log(action.payload);

      state.rowModesModel = {
        ...state.rowModesModel,
        [action.payload]: {
          mode: GridRowModes.View,
          ignoreModifications: true,
        },
      };

      const editedRow = state.rows.find(
        (row: GridRowModel) => row.id === action.payload
      );
      console.log(editedRow);

      if (editedRow!.isNew) {
        state.rows = state.rows.filter(
          (row: GridRowModel) => row.id !== action.payload
        );
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
        // console.log('PENDING');
        // state.status = 'loading';
      })
      .addCase(updateDataAsync.fulfilled, (state, action) => {
        console.log('SUCCESS');
        // const updatedRow = action.payload;
        // console.log(state.rows);
        // state.rows = state.rows.map((row: GridRowModel) =>
        //   row.id === updatedRow.id
        //     ? {
        //         isNew: false,
        //         id: updatedRow.id,
        //         name: `${updatedRow.first_name} ${updatedRow.last_name}`,
        //         maxDrivingDistance: updatedRow.max_driving_distance,
        //         profilePictureScore: updatedRow.score_profile_picture_score,
        //         profileDescriptionScore:
        //           updatedRow.score_profile_description_score,
        //       }
        //     : row
        // );
      })
      .addCase(updateDataAsync.rejected, (state) => {
        // console.log('REJECT');
        // state.status = 'failed';
      })
      .addCase(getAllCraftsmenAsync.pending, (state) => {
        // console.log('PENDING');
        // state.status = 'loading';
      })
      .addCase(getAllCraftsmenAsync.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.rowsCount = action.payload.data.totalCraftsmenCount;
        state.rows = action.payload.data.craftsmen.map(
          (item: SingleCraftsManItem, idx: number) => {
            console.log(idx);
            return {
              isNew: false,
              id: item.id,
              name: `${item.first_name} ${item.last_name}`,
              maxDrivingDistance: item.max_driving_distance,
              profilePictureScore: item.score.profile_picture_score,
              profileDescriptionScore: item.score.profile_description_score,
            };
          }
        );
      })
      .addCase(getAllCraftsmenAsync.rejected, (state) => {
        // console.log('REJECT');
        // state.status = 'failed';
      });
  },
});

export const { cancelEditMode, openEditMode, changeRowModesModel, saveRow } =
  updatePanelSlice.actions;

export default updatePanelSlice.reducer;

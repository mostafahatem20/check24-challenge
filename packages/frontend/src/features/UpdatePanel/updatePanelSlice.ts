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
}

export interface SingleCraftsManItem {
  score_id: number;
  score_profile_description_score: number;
  score_profile_id: number;
  score_profile_picture_score: number;
  spp_city: string;
  spp_first_name: string;
  spp_house_number: string;
  spp_id: number;
  spp_last_name: string;
  spp_lat: number;
  spp_lon: number;
  spp_max_driving_distance: number;
  spp_street: string;
  isNew: boolean;
  id: number;
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
  status: 'idle',
};

export const selectRows = (state: RootState) => state.updatePanel.rows;
export const selectrowModesModel = (state: RootState) =>
  state.updatePanel.rowModesModel;

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
    // console.log(response.data);

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
        //         id: updatedRow.spp_id,
        //         name: `${updatedRow.spp_first_name} ${updatedRow.spp_last_name}`,
        //         maxDrivingDistance: updatedRow.spp_max_driving_distance,
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
        console.log(action.payload.data);

        state.rows = action.payload.data.map(
          (item: SingleCraftsManItem, idx: number) => {
            console.log(idx);

            return {
              // ...item,
              isNew: false,
              id: item.spp_id,
              // id: idx,
              name: `${item.spp_first_name} ${item.spp_last_name}`,
              maxDrivingDistance: item.spp_max_driving_distance,
              profilePictureScore: item.score_profile_picture_score,
              profileDescriptionScore: item.score_profile_description_score,
            };
          }
        );
        console.log(state.rows.length);
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

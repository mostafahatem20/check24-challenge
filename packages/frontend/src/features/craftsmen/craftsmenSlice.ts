import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getCraftsmen } from "./craftsmenAPI";
import { Craftsman, GetCraftsmen } from "@not-so-software/shared";
export interface CraftsmenState {
  status: "idle" | "loading" | "failed";
  craftsmen: Craftsman[];
}

const initialState: CraftsmenState = {
  status: "idle",
  craftsmen: [],
};

export const getCraftsmenByPostalCode = createAsyncThunk(
  "craftsmen/getCraftsmenByPostalCode",
  async (body: GetCraftsmen) => {
    const response = await getCraftsmen(body);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const craftsmenSlice = createSlice({
  name: "craftsmen",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCraftsmenByPostalCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCraftsmenByPostalCode.fulfilled, (state, action) => {
        state.status = "idle";
        state.craftsmen = action.payload;
      })
      .addCase(getCraftsmenByPostalCode.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCraftsmen = (state: RootState) => state.craftsmen;

export default craftsmenSlice.reducer;

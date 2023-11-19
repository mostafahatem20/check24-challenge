import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import craftsmenReducer from '../features/craftsmen/craftsmenSlice';
import updatePanelReducer from '../features/UpdatePanel/updatePanelSlice';

export const store = configureStore({
  reducer: {
    craftsmen: craftsmenReducer,
    updatePanel: updatePanelReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

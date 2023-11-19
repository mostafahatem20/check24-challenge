import { GridRowModel } from '@mui/x-data-grid';
import { craftsmenAxios } from '../../utils/axios';
import { SingleCraftsManRow } from './updatePanelSlice';

// A mock function to mimic making an async request for data
export function fetchCraftsmen(amount = 1) {
  console.log('FETCH DATA');

  return new Promise<{ data: [] }>((resolve) =>
    setTimeout(() => resolve({ data: [] }), 500)
  );
}

export function updateData(updatedRow: GridRowModel) {
  console.log('CALLING BACKEND TO UPDATE DATA');
  console.log(updatedRow);

  return craftsmenAxios.patch(`/${updatedRow.id}`, {
    maxDrivingDistance: updatedRow.maxDrivingDistance,
    profileDescriptionScore: updatedRow.profileDescriptionScore,
    profilePictureScore: updatedRow.profilePictureScore,
  });
}

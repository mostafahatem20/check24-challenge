import { GridRowModel } from '@mui/x-data-grid';

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

  return new Promise<{ data: GridRowModel }>((resolve) =>
    setTimeout(() => resolve({ data: updatedRow }), 1500)
  );
}

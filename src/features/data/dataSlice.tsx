import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../models/productModel';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('/data.json'); // Ensure this path is correct
  const data: Product[] = await response.json(); // Correctly type as an array of Product
  return data[0]; // Assuming we are dealing with the first product in the JSON array
});

interface DataState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  product: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSlice.reducer;

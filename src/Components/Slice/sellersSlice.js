import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const SELLERAPI_URL = `${BASE_URL}/api/sellers/`;

export const fetchAllSellers = createAsyncThunk(
  "sellers/fetchAllSellers",
  async () => {
    const response = await axios.get(SELLERAPI_URL);
    return response.data;
  }
);

export const deleteSeller = createAsyncThunk(
  "sellers/deleteSeller",
  async (id) => {
    await axios.delete(`${SELLERAPI_URL}${id}`);
    return id;
  }
);

export const fetchSellerByUserId = createAsyncThunk(
  "sellers/fetchSellerByUserId",
  async (userId) => {
    const response = await axios.get(`${SELLERAPI_URL}user/${userId}`);
    return response.data;
  }
);

export const createSeller = createAsyncThunk(
  "sellers/createSeller",
  async (sellerData) => {
    const formData = new FormData();
    formData.append("name", sellerData.name);
    formData.append("userId", sellerData.userId);
    formData.append("phoneNo", sellerData.phoneNo);
    formData.append("category", sellerData.category);

    if (sellerData.status) {
      formData.append("status", sellerData.status);
    }

    if (sellerData.image) {
      formData.append("image", sellerData.image);
    }

    const response = await axios.post(SELLERAPI_URL, formData);
    return response.data;
  }
);

export const updateSeller = createAsyncThunk(
  "sellers/updateSeller",
  async ({ id, sellerData }) => {
    const formData = new FormData();
    formData.append("name", sellerData.name);
    formData.append("userId", sellerData.userId);
    formData.append("phoneNo", sellerData.phoneNo);
    formData.append("category", sellerData.category);

    if (sellerData.status) {
      formData.append("status", sellerData.status);
    }

    if (sellerData.image) {
      formData.append("image", sellerData.image);
    }

    const response = await axios.put(`${SELLERAPI_URL}${id}`, formData);
    return response.data;
  }
);

export const updateSellerStatus = createAsyncThunk(
  "sellers/updateSellerStatus",
  async ({ id, status }) => {
    const response = await axios.patch(`${SELLERAPI_URL}${id}/status`, { status });
    return response.data;
  }
);

const sellersSlice = createSlice({
  name: "sellers",
  initialState: {
    sellers: [],
    seller: null,
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ALL ---------- */
      .addCase(fetchAllSellers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchSellerByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSellerByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.seller = action.payload;
      })
      .addCase(fetchSellerByUserId.rejected, (state) => {
        state.status = "failed";
        state.seller = null;
      })

      .addCase(createSeller.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.seller = action.payload; // ⭐ KEY FIX
      })

      .addCase(updateSeller.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.seller = action.payload; // keep single seller
        // Replace the updated seller in the sellers list so UI reflects changes immediately
        state.sellers = state.sellers.map((s) => (s._id === action.payload._id ? action.payload : s));
      });

    builder.addCase(updateSellerStatus.pending, (state) => { state.status = 'loading'; });
    builder.addCase(updateSellerStatus.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // update sellers list
      state.sellers = state.sellers.map((s) => (s._id === action.payload._id ? action.payload : s));
      if (state.seller && state.seller._id === action.payload._id) state.seller = action.payload;
    });
    builder.addCase(updateSellerStatus.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; });

    /* ---------- DELETE ---------- */
    builder.addCase(deleteSeller.fulfilled, (state, action) => {
      state.sellers = state.sellers.filter((s) => s._id !== action.payload);
      if (state.seller?._id === action.payload) state.seller = null;
    });
  },
});

export default sellersSlice.reducer;

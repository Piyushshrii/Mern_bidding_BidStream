import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Set the backend URL from the environment variable or default to localhost
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000"; 

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
  },
  reducers: {
    postCommissionProofRequest(state, action) {
      state.loading = true;
    },
    postCommissionProofSuccess(state, action) {
      state.loading = false;
    },
    postCommissionProofFailed(state, action) {
      state.loading = false;
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/commission/proof`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(commissionSlice.actions.postCommissionProofSuccess());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(commissionSlice.actions.postCommissionProofFailed());
    toast.error(error.response.data.message);
  }
};

export default commissionSlice.reducer;


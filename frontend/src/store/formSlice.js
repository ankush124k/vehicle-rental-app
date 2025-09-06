import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/api';

const initialState = {
  currentStep: 1,
  firstName: '',
  lastName: '',
  wheels: null,
  vehicleTypeId: null,
  vehicleId: null,
  startDate: null,
  endDate: null,
  // State for the vehicle types API call
  vehicleTypes: [],  
  statusTypes: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  errorTypes: null,

  // State for the specific vehicle models API call
  vehicles: [],  
  statusVehicles: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  errorVehicles: null,

  // State for the final booking submission
  bookingStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  bookingError: null,
};

// --- Async Thunks for API Calls ---

// Thunk for fetching vehicle TYPES
export const fetchVehicleTypes = createAsyncThunk(
  'form/fetchVehicleTypes',
  async (wheels, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/vehicles?wheels=${wheels}`);
      return response.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch vehicle types.');
    }
  }
);

// Thunk for fetching specific vehicle MODELS for a given type
export const fetchVehicles = createAsyncThunk(
  'form/fetchVehicles',
  async (typeId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/vehicles?typeId=${typeId}`);
       return response.data.data[0]?.vehicles || []; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch vehicle models.');
    }
  }
);

// Thunk for submitting the final booking
export const submitBooking = createAsyncThunk(
  'form/submitBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/bookings', bookingData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'An unexpected error occurred during booking.');
    }
  }
);


const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => { state.currentStep += 1; },
    prevStep: (state) => { state.currentStep -= 1; },
    setName: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    // When wheels are changed, reset all dependent data
    setWheels: (state, action) => {
      state.wheels = action.payload;
      state.vehicleTypeId = null;
      state.vehicleId = null;
      state.vehicleTypes = [];
      state.vehicles = [];
    },
    // When vehicle type is changed, reset the specific model selection
    setVehicleType: (state, action) => {
      state.vehicleTypeId = action.payload;
      state.vehicleId = null;
      state.vehicles = [];
    },
    setVehicle: (state, action) => {
      state.vehicleId = action.payload;
    },
    setDateRange: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    // Resets the entire form to its initial state for a new booking
    resetForm: () => initialState,
  },

  // Handles the state changes for our async thunks
  extraReducers: (builder) => {
    builder
      // Vehicle Types
      .addCase(fetchVehicleTypes.pending, (state) => { state.statusTypes = 'loading'; })
      .addCase(fetchVehicleTypes.fulfilled, (state, action) => {
        state.statusTypes = 'succeeded';
        state.vehicleTypes = action.payload;
      })
      .addCase(fetchVehicleTypes.rejected, (state, action) => {
        state.statusTypes = 'failed';
        state.errorTypes = action.payload;
      })
      // Vehicle Models
      .addCase(fetchVehicles.pending, (state) => { state.statusVehicles = 'loading'; })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.statusVehicles = 'succeeded';
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.statusVehicles = 'failed';
        state.errorVehicles = action.payload;
      })
      // Booking Submission
      .addCase(submitBooking.pending, (state) => {
        state.bookingStatus = 'loading';
        state.bookingError = null;
      })
      .addCase(submitBooking.fulfilled, (state) => { state.bookingStatus = 'succeeded'; })
      .addCase(submitBooking.rejected, (state, action) => {
        state.bookingStatus = 'failed';
        state.bookingError = action.payload;
      });
  },
});

export const {
  nextStep,
  prevStep,
  setName,
  setWheels,
  setVehicleType,
  setVehicle,
  setDateRange,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;

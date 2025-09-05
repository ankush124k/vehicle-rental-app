import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1, 
  firstName: '',
  lastName: '',
  wheels: null,
  vehicleType: null,
  vehicle: null,
  startDate: null,
  endDate: null,
  bookingStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep(state) {
      state.currentStep += 1;
    },
    prevStep(state) {
      state.currentStep -= 1;
    },
    setName(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setWheels(state, action) {
      state.wheels = action.payload;
    },
    setVehicleType(state, action) {
      state.vehicleType = action.payload;
    },
    setVehicle(state, action) {
      state.vehicle = action.payload;
    },
    setDateRange(state, action) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    resetForm: () => initialState,
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

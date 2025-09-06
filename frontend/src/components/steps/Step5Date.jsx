import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitBooking, setDateRange, prevStep } from '../../store/formSlice';
import { Box, Typography, Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import FormNavigation from '../FormNavigation';

const Step5Date = () => {
  const dispatch = useDispatch();
  const { 
    startDate, 
    endDate, 
    bookingStatus, 
    bookingError, 
    firstName, 
    lastName, 
    vehicleId 
  } = useSelector((state) => state.form);

  const handleDateChange = (field) => (newValue) => {
    const dates = { startDate, endDate };
    dates[field] = newValue ? newValue.toISOString() : null;
    dispatch(setDateRange(dates));
  };

  const handleSubmit = () => {
    const bookingData = {
      firstName,
      lastName,
      vehicleId: Number(vehicleId),
      startDate,
      endDate,
    };
    dispatch(submitBooking(bookingData));
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Select your rental dates
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <DatePicker
          label="Start Date"
          value={startDate ? dayjs(startDate) : null}
          onChange={handleDateChange('startDate')}
          disablePast
        />
        <DatePicker
          label="End Date"
          value={endDate ? dayjs(endDate) : null}
          onChange={handleDateChange('endDate')}
          disablePast
          minDate={startDate ? dayjs(startDate).add(1, 'day') : undefined}
        />
      </Box>

      {bookingStatus === 'failed' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {bookingError}
        </Alert>
      )}

      <FormNavigation
        hasBack={true}
        onBack={handleBack}
        onNext={handleSubmit}
        isNextDisabled={!startDate || !endDate || bookingStatus === 'loading'}
        nextLabel="Book Now"
        isLoading={bookingStatus === 'loading'}
      />
    </Box>
  );
};

export default Step5Date;


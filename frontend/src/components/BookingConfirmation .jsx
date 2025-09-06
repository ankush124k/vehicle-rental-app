import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { resetForm } from '../store/formSlice';

const BookingConfirmation = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetForm());
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        textAlign: 'center', 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2 
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main' }} />
      <Typography variant="h4" component="h2" gutterBottom>
        Booking Confirmed!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Your vehicle has been successfully booked. We've sent a confirmation to your email.
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleReset} 
        sx={{ mt: 2 }}
      >
        Book Another Vehicle
      </Button>
    </Paper>
  );
};

export default BookingConfirmation;

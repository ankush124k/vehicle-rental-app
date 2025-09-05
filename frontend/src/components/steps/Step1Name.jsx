import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName, nextStep } from '../../store/formSlice';
import { TextField, Typography, Box, Alert } from '@mui/material';
import FormNavigation from '../FormNavigation';

const Step1Name = () => {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.form);
  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!localFirstName || !localLastName) {
      setError('Both first and last name are required.');
      return;
    }
    setError('');

    dispatch(setName({ firstName: localFirstName, lastName: localLastName }));
    dispatch(nextStep());
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        First, what's your name?
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        label="First Name"
        variant="outlined"
        value={localFirstName}
        onChange={(e) => setLocalFirstName(e.target.value)}
        sx={{ mb: 2 }}
        error={!!error && !localFirstName}
      />
      <TextField
        fullWidth
        label="Last Name"
        variant="outlined"
        value={localLastName}
        onChange={(e) => setLocalLastName(e.target.value)}
        error={!!error && !localLastName} 
      />
      
      <FormNavigation onNext={handleNext} />
    </Box>
  );
};

export default Step1Name;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles, setVehicle, nextStep, prevStep } from '../../store/formSlice';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, CircularProgress, Alert } from '@mui/material';
import FormNavigation from '../FormNavigation';

const Step4Model = () => {
  const dispatch = useDispatch();
  const { vehicleTypeId, vehicles, vehicleId, statusVehicles, errorVehicles } = useSelector((state) => state.form);

  useEffect(() => {
    if (vehicleTypeId) {
      dispatch(fetchVehicles(vehicleTypeId));
    }
  }, [vehicleTypeId, dispatch]);

  const handleModelChange = (event) => {
    dispatch(setVehicle(event.target.value));
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  let content;
  if (statusVehicles === 'loading') {
    content = <CircularProgress />;
  } else if (statusVehicles === 'succeeded') {
    content = (
      <RadioGroup value={vehicleId || ''} onChange={handleModelChange}>
        {vehicles.map((vehicle) => (
          <FormControlLabel
            key={vehicle.id}
            value={vehicle.id.toString()}
            control={<Radio />}
            label={vehicle.name}
          />
        ))}
      </RadioGroup>
    );
  } else if (statusVehicles === 'failed') {
    content = <Alert severity="error">{errorVehicles}</Alert>;
  }

  return (
    <Box>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" sx={{ mb: 1, typography: 'h5' }}>
          Which specific model?
        </FormLabel>
        {content}
      </FormControl>
      <FormNavigation
        hasBack={true}
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!vehicleId}
      />
    </Box>
  );
};

export default Step4Model;


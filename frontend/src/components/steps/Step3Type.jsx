import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicleTypes, setVehicleType, nextStep, prevStep } from '../../store/formSlice';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, CircularProgress, Alert } from '@mui/material';
import FormNavigation from '../FormNavigation';

const Step3Type = () => {
  const dispatch = useDispatch();
  const { wheels, vehicleTypes, vehicleTypeId, statusTypes, errorTypes } = useSelector((state) => state.form);

  useEffect(() => {
    if (wheels) {
      dispatch(fetchVehicleTypes(wheels));
    }
  }, [wheels, dispatch]);

  const handleTypeChange = (event) => {
    dispatch(setVehicleType(event.target.value));
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  let content;
  if (statusTypes === 'loading') {
    content = <CircularProgress />;
  } else if (statusTypes === 'succeeded') {
    content = (
      <RadioGroup value={vehicleTypeId || ''} onChange={handleTypeChange}>
        {vehicleTypes?.map((type) => (
          <FormControlLabel
            key={type.id}
            value={type.id.toString()}  
            control={<Radio />}
            label={type.name}
          />
        ))}
      </RadioGroup>
    );
  } else if (statusTypes === 'failed') {
    content = <Alert severity="error">{errorTypes}</Alert>;
  }

  return (
    <Box>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" sx={{ mb: 1, typography: 'h5' }}>
          What type of vehicle?
        </FormLabel>
        {content}
      </FormControl>
      <FormNavigation
        hasBack={true}
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!vehicleTypeId}
      />
    </Box>
  );
};

export default Step3Type;


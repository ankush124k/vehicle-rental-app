import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWheels, nextStep, prevStep } from '../../store/formSlice';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import FormNavigation from '../FormNavigation';

const Step2Wheels = () => {
  const dispatch = useDispatch();
  const { wheels } = useSelector((state) => state.form);

  const handleWheelsChange = (event) => {
    dispatch(setWheels(Number(event.target.value)));
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <Box>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" sx={{ mb: 1, typography: 'h5' }}>
          Number of wheels?
        </FormLabel>
        <RadioGroup
          row
          aria-label="wheels"
          name="wheels-radio-group"
          value={wheels || ''}
          onChange={handleWheelsChange}
        >
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
        </RadioGroup>
      </FormControl>
      <FormNavigation
        hasBack={true}
        onBack={handleBack}
        onNext={handleNext}
        isNextDisabled={!wheels} 
      />
    </Box>
  );
};

export default Step2Wheels;
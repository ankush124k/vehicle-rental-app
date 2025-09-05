import React from 'react';
import { Box, Button } from '@mui/material';

const FormNavigation = ({ hasBack = false, onBack, onNext, isNextDisabled = false }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
      {hasBack && (
        <Button onClick={onBack} sx={{ mr: 1 }}>
          Back
        </Button>
      )}
      <Button
        variant="contained"
        onClick={onNext}
        disabled={isNextDisabled}
      >
        Next
      </Button>
    </Box>
  );
};

export default FormNavigation;

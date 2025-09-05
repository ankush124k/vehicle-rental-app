import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import FormContainer from './components/FormContainer';

function App() {
  return (
    // Container component from MUI centers content and sets a max-width
    <Container component="main" maxWidth="sm" sx={{ my: 4 }}>
      {/* Paper provides a nice, elevated card effect for our form */}
      <Paper 
        elevation={3} 
        sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Vehicle Rental
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Book your ride in just a few simple steps.
          </Typography>
        </Box>
        
        {/* We render the main FormContainer which will handle the step logic */}
        <FormContainer />

      </Paper>
    </Container>
  );
}

export default App;

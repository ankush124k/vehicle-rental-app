const express = require('express');
require('dotenv').config();
const indexRoutes = require('./routes/indexRoutes')

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from the Vehicle Rental App Backend!');
});

app.listen(PORT, (error) => {
    if(error){
        console.log(`server stopped ${error}`);
        exit(1);
        
    }else{
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});


app.use('/api',indexRoutes)

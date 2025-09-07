const express = require('express');
require('dotenv').config();
const cors = require('cors');
const indexRoutes = require('./routes/indexRoutes')
const app = express();
const PORT = process.env.PORT || 8000;
const allowedOrigins = [
  'http://localhost:5173',                      
  'https://vehicle-rental-app-tau.vercel.app',
  'https://vehicle-rental-gynnkjtwp-ankush124ks-projects.vercel.app/',
  'https://vehicle-rental-app-git-main-ankush124ks-projects.vercel.app/',
  'https://vehicle-rental-app-tau.vercel.app/'   
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);
    
    // Check if the incoming origin is in our whitelist
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from the Vehicle Rental App Backend!');
});

app.use('/api',indexRoutes);

app.listen(PORT, (error) => {
    if(error){
        console.log(`server stopped ${error}`);
        exit(1);
        
    }else{
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});



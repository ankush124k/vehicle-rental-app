Vehicle Rental Application
A full-stack web application that provides a seamless, multi-step form for users to book a rental vehicle. The application features a dynamic UI that fetches data from a backend API, ensuring that vehicle options are always up-to-date. The backend includes business logic to prevent booking conflicts.

✨ Live Demo ✨
Features
Multi-Step Form: A clean, user-friendly interface that guides the user through the booking process one question at a time.

Dynamic & Conditional Steps: Vehicle type and model options are dynamically fetched from the backend based on the user's previous selections (e.g., number of wheels).

Booking Conflict Validation: The backend API ensures that a vehicle cannot be booked for date ranges that overlap with existing bookings.

Responsive Design: The user interface is designed to work smoothly on both desktop and mobile devices.

Centralized State Management: Uses Redux Toolkit on the frontend for predictable and robust state management throughout the booking process.

Professional Backend Architecture: The backend is built using a service-based architecture (Routes → Controllers → Services) for clean separation of concerns and maintainability.

🛠️ Tech Stack
Frontend
Technology

Description

Vite + React

A fast and modern build tool and UI library for building the user interface.

Redux Toolkit

The official, recommended way to manage global application state in React.

Material-UI

A popular React UI framework for building beautiful and accessible components.

Axios

A promise-based HTTP client for making API calls to the backend.

Vercel

The platform used for deploying and hosting the live frontend application.

Backend
Technology

Description

Node.js + Express

The runtime and web framework used to build the robust and scalable REST API.

PostgreSQL

A powerful, open-source relational database used for data persistence.

Prisma

A next-generation ORM that provides a type-safe database client and simplifies migrations.

CORS

Middleware used to securely handle cross-origin requests from the deployed frontend.

Render

The platform used for deploying and hosting the backend server and database.

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm

A PostgreSQL database connection string.

1. Clone the Repository
git clone [https://github.com/your-username/vehicle-rental-app.git](https://github.com/your-username/vehicle-rental-app.git)
cd vehicle-rental-app

2. Backend Setup
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend root and add your database URL
# See .env.example for reference
touch .env
echo "DATABASE_URL=\"your-postgresql-connection-string\"" > .env

# Run the database migrations to create the tables
npx prisma migrate dev

# Seed the database with initial data
npx prisma db seed

# Start the backend server
npm run dev

The backend server will be running on http://localhost:8000.

3. Frontend Setup
# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Create a .env file in the frontend root for local development
touch .env
echo "VITE_REACT_BASE_URL=http://localhost:8000/api" > .env

# Start the frontend development server
npm run dev

The frontend application will be available at http://localhost:5173.

📝 API Endpoints
The following REST API endpoints have been implemented:

GET /api/vehicles: Fetches a list of vehicle types.

Query Params:

?wheels={number}: Filters vehicle types by the number of wheels.

?typeId={id}: Fetches the details of a single vehicle type, including its specific models.

POST /api/bookings: Creates a new booking.

Body: { firstName, lastName, vehicleId, startDate, endDate }

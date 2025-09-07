// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'https://vehicle-rental-app-mm9z.onrender.com/api',
// });

// export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_URL,
});

export default apiClient;


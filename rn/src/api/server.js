import axios from 'axios';

const API_URL = 'http://192.168.43.170:8000';

// Return a custom axios instance
export default axios.create({
  baseURL: `${API_URL}/api/`,
});

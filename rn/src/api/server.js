import axios from 'axios';

const API_URL = 'http://www.gamelo.xyz:8080';

// Return a custom axios instance
export default axios.create({
  baseURL: `${API_URL}/api/`,
});

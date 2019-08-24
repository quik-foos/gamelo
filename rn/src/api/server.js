import axios from 'axios';

const API_URL = 'http://100.64.209.95:8000';

// Return a custom axios instance
export default axios.create({
  baseURL: `${API_URL}/api/`,
});

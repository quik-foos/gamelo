import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

// Return a custom axios instance
export default axios.create({
  baseURL: `${API_URL}/api/`
})

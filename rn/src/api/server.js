import axios from 'axios'

// const API_URL = 'http://www.gamelo.xyz:8080'
const API_URL = 'http://192.168.2.34:8000'

// Return a custom axios instance
export default axios.create({
  baseURL: `${API_URL}/api/`
})

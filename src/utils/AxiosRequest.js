// src/utils/AxiosRequest.js
import axios from 'axios';

const AxiosRequest = axios.create({
  baseURL: 'http://localhost:5000', // Direct server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosRequest;

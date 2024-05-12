import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
    "ngrok-skip-browser-warning":  'skip-browser-warning',
  },
});

export default client;
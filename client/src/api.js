import axios from "axios";

const API = axios.create({
    // Change process.env.baseURL to import.meta.env.VITE_baseURL
    baseURL: import.meta.env.VITE_baseURL,
});

export default API;
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api', // change this to your actual backend URL
    withCredentials: true, // if you’re using cookies/sessions
});

export default API;
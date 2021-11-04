import axios from "axios";

const instance = axios.create({
    // .. where we make our configurations
    baseURL: "http://localhost:8000/",
});

export default instance;

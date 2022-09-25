import axios from "axios";

const http = axios.create({
	baseURL: (process.env.NODE_ENV==='development')? "http://localhost:8080" : "",
});

export default http;

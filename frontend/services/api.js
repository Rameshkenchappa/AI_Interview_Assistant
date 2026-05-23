import axios from "axios";

const API = axios.create({
  baseURL: "http://10.59.54.178:8000",
});

export default API;
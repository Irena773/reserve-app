import axios from "axios";

const API_BASEURL = "http://127.0.0.1:8000/"

export default axios.create({ baseURL: API_BASEURL });

export const authAxios = axios.create({
  baseURL: API_BASEURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
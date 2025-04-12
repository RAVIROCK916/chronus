import axios from "axios";
import { SERVER_URL } from "@/constants";

const privateAPI = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default privateAPI;

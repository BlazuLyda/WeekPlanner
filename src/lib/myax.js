import axios from "axios";
import { env } from '$env/dynamic/public';

const myax = axios.create({
  baseURL: env.PUBLIC_BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  withCredentials: true
})

export default myax
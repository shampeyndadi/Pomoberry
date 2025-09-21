import axios from "axios";

export default () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/",
    withCredentials: true,
  });
};

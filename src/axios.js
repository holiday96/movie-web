import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:3001",
  headers: { Auth: "VDB" },
  timeout: 3000,
});

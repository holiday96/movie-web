import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://d1d4p.sse.codesandbox.io/",
  headers: { Auth: "VDB" },
  timeout: 3000,
});

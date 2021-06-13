import Axios from "axios";
import env from "react-dotenv";

export const axios = Axios.create({
  // baseURL: "https://d1d4p.sse.codesandbox.io/",
  baseURL: `${env.LOCAL_HOST_API_URL}`,
  headers: { Auth: "VDB" },
  timeout: 3000,
});

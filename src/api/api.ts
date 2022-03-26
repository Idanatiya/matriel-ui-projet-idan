import axios from "axios";
export const coinStatsClient = axios.create({
  baseURL: "https://api.coinstats.app/public/v1/",
});

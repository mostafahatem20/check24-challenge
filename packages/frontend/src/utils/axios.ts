import axios from "axios";

export const craftsmenAxios = axios.create({
  baseURL: "http://localhost:8000/craftsmen",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

import axios from "axios";

export const rapid = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY as string,
    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
  },
  timeout: 20000,
});

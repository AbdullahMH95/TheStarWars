import axios from "axios";

export default (api = axios.create({
  baseURL: "https://swapi.co/api/",
  timeout: 1000000
}));

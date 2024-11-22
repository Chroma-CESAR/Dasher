import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_API_URL;
//Não consegui passar a variável de ambiente pelo docker-compose

const baseURL = "http://localhost:8001";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;

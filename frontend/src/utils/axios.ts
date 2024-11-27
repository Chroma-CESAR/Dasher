import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
// Crie um arquivo .env.local dentro da pasta frontend e adicione a variável NEXT_PUBLIC_API_URL=http://localhost:8001/

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;

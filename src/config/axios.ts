import axios from "axios";

// Configuración de Axios para la aplicación
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
// Interceptor para agregar el token de autenticación a cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN") 
  if (token){
  config.headers.Authorization = `Bearer ${token}`}
    
  return config
});

export default api;

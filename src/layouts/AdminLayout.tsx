import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/LeCocomApi";
import { Navigate, Outlet } from "react-router-dom";
import LoadingHeader from "../components/LoadingHeader";

export default function AdminLayout() {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // 1. Estado de carga
  if (isLoading) {
    return <LoadingHeader />;
  }

  // 2. Si no hay token/sesión o falla la API, enviar al Login
  if (isError || !user) {
    console.log("Usuario no autenticado. Redirigiendo a login...");
    return <Navigate to="/user/login" replace />;
  }

  // 3. Verificación de permisos de Administrador
  // Ajusta 'user.role' según cómo devuelva tu backend la propiedad (ej. user.isAdmin, user.role, etc.)
  if (user.admin !== true) {
    console.log("Acceso denegado: El usuario no tiene rol de Administrador.");
    return <Navigate to="/" replace />;
  }

  // 4. Si es Admin, renderiza las subrutas hijas pasándole los datos mediante contexto (opcional)
  return <Outlet context={{ user }} />;
}
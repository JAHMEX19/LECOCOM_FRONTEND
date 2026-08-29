import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/LeCocomApi";
import { Navigate, Outlet } from "react-router-dom";
import LoadingHeader from "../components/LoadingHeader";

export default function SAdminLayout() {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // 1. Estado de carga inicial
  if (isLoading) {
    return <LoadingHeader />;
  }

  // 2. Si no hay sesión activa o falla la API, redirigir al login
  if (isError || !user) {
    console.log("Usuario no autenticado. Redirigiendo a login...");
    return <Navigate to="/user/login" replace />;
  }

  // 3. Verificación de permisos de Super Administrador
  if (!user.superAdmin) {
    console.log("Acceso denegado: Se requieren permisos de Super Administrador.");
    return <Navigate to="/auth/profile" replace />;
  }

  // 4. Si pasa las validaciones, renderiza las subrutas (UsersManagementView, RegisterView, etc.)
  return <Outlet context={{ user }} />;
}

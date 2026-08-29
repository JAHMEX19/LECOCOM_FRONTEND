import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/LeCocomApi";
import { Navigate, Outlet } from "react-router-dom";
import LoadingHeader from "../components/LoadingHeader";

export default function SuperAdminLayout() {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingHeader />;

  if (isError || !user) {
    return <Navigate to="/user/login" replace />;
  }

  // Exclusivo para SuperAdmin
  if (!user.superAdmin) {
    console.log("Acceso denegado: Se requieren permisos de Super Administrador.");
    return <Navigate to="/auth/profile" replace />;
  }

  return <Outlet context={{ user }} />;
}
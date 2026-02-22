import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/LeCocomApi";
import { Navigate } from "react-router-dom";
import LoadingHeader from "../components/LoadingHeader";
import UserProfileView from "../views/UserProfileView";

export default function ClientLayout() {

  // Aquí es donde decidimos qué mostrar según el estado de la consulta del usuario
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return LoadingHeader();
  }
  if (isError) {
    return <Navigate to="/user/login" />;
  }

  // Si tenemos datos del usuario, mostramos el perfil. De lo contrario, redirigimos al login.
  if (data) return <UserProfileView data={data} />
  

}

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/LeCocomApi";
import LoadingHeader from "../components/LoadingHeader";
import UserInput from "../components/UserInput";

export default function UsersManagementView() {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users-list"],
    queryFn: getAllUsers,
  });
  
  if (isLoading) return <LoadingHeader />;
  if (isError) return <p className="text-rose-500 text-center">{error.message}</p>;

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-light text-stone-800 uppercase tracking-[0.15em]">
          Gestión de <span className="font-serif italic text-[#2897A3]">Permisos</span>
        </h2>
        <p className="text-stone-400 text-xs uppercase tracking-widest">
          Administración de roles Admin y SuperAdmin para cuentas activas
        </p>
      </header>

      <div className="space-y-4">
        {users?.map((user) => (
          <UserInput key={user._id} item={user} />
        ))}
      </div>
    </div>
  );
}
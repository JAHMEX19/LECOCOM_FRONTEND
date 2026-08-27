import { Outlet, useNavigate } from "react-router-dom";
import NavigationTabs from "../components/NavigationsTabs";
import { Toaster } from "sonner";
import type { User } from "../types";
import { useQueryClient } from "@tanstack/react-query";

type UserProfileViewProps = {
  data: User;
};

export default function UserProfileView({ data }: UserProfileViewProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    console.log("Cerrando sesión...");
    navigate("/user/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FCFAF8] font-sans selection:bg-[#2897A3]/10 flex flex-col">
      {/* HEADER DE PANEL AUTENTICADO */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Le Cocom Spa" className="h-9 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm tracking-[0.2em] text-stone-700 font-light leading-none uppercase">
                Le Cocom
              </span>
              <span className="text-[9px] tracking-[0.4em] text-[#2897A3] font-bold">
                {data.admin ? "ADMINISTRACIÓN" : "MY WELLNESS"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-l border-stone-100 pl-6 ml-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] tracking-[0.3em] text-[#2897A3] font-bold uppercase">
                {data.name}
              </span>

              <button 
                className="text-[9px] uppercase tracking-[0.2em] text-stone-400 hover:text-red-400 transition-colors duration-300 font-medium cursor-pointer"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>

            <div className="h-10 w-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-[#D4C363] uppercase">
                {data.handle ? data.handle.charAt(0).toUpperCase() : data.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* COMPONENTE DE PESTAÑAS DE NAVEGACIÓN */}
      <NavigationTabs isAdmin={data.admin ?? false} />

      <main className="flex-grow py-8 md:py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ÁREA DE CONTENIDO PRINCIPAL: DELEGADA AUTOMÁTICAMENTE A REACT ROUTER */}
          <div className="flex-1 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-stone-200/60 animate-fadeIn">
            <Outlet context={{ user: data }} />
          </div>

          {/* SIDEBAR DE PERFIL / RESUMEN */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 border border-stone-200/60 sticky top-28 space-y-6 shadow-sm">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#2897A3] font-bold border-b border-stone-100 pb-4">
                {data.admin ? "Panel de Gestión" : "Resumen Wellness"}
              </h3>
              
              <div className="flex flex-col items-center py-4 px-2">
                <div className="relative group">
                  <div className={`absolute -inset-1.5 bg-gradient-to-tr ${data.admin ? 'from-[#2897A3]/40 to-[#D4C363]/40' : 'from-[#D4C363]/40 to-[#2897A3]/30'} rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-500`}></div>
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-stone-50">
                    {data.image ? (
                      <img src={data.image} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-3xl font-light text-stone-300">{data.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-[11px] uppercase tracking-[0.4em] text-[#2897A3] font-bold">{data.name}</h2>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 mt-2 font-medium">
                    {data.admin ? "Administrador" : "Cliente Wellness"}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
}
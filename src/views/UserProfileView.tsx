import { Outlet, useNavigate } from "react-router-dom";
import NavigationTabs from "../components/NavigationsTabs";
import { Toaster } from "sonner";
import type { User } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldCheckIcon, SparklesIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

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
    navigate("/user/login", { replace: true });
  };

  // Helper para etiqueta de rol
  const getRoleLabel = () => {
    if (data.superAdmin) return "Super Administrador";
    if (data.admin) return "Administrador General";
    return "Cliente Preferencial";
  };

  return (
    <div className="min-h-screen bg-[#FCFAF8] font-sans selection:bg-[#2897A3]/10 flex flex-col">
      
      {/* HEADER DE PANEL AUTENTICADO */}
      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-stone-200/60 shadow-sm transition-all">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Label */}
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="Le Cocom Spa" className="h-9 w-auto" />
            <div className="hidden sm:flex flex-col border-l border-stone-200/80 pl-4">
              <span className="text-xs tracking-[0.25em] text-stone-800 font-light leading-none uppercase">
                Le Cocom
              </span>
              <span className="text-[9px] tracking-[0.4em] text-[#2897A3] font-black uppercase mt-1">
                {data.superAdmin ? "Super Admin Portal" : data.admin ? "Portal de Gestión" : "Santuario Wellness"}
              </span>
            </div>
          </div>

          {/* User Info & Logout Button */}
          <div className="flex items-center gap-5 border-l border-stone-200/80 pl-6">
            <div className="flex flex-col items-end">
              <span className="text-xs tracking-[0.2em] text-stone-800 font-bold uppercase">
                {data.name}
              </span>
              <button 
                className="text-[9px] uppercase tracking-[0.25em] text-stone-400 hover:text-rose-500 transition-colors duration-300 font-bold flex items-center gap-1.5 mt-0.5 cursor-pointer group"
                onClick={handleLogout}
              >
                <span>Cerrar Sesión</span>
                <ArrowRightStartOnRectangleIcon className="h-3 w-3 text-stone-400 group-hover:text-rose-500 transition-colors" />
              </button>
            </div>

            {/* Avatar Badge */}
            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-stone-900 to-stone-800 text-white flex items-center justify-center shadow-lg shadow-stone-900/10 border border-stone-700/30">
              <span className="text-xs font-black text-[#D4C363] uppercase tracking-widest">
                {data.handle ? data.handle.charAt(0).toUpperCase() : data.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* COMPONENTE DE PESTAÑAS DE NAVEGACIÓN (CON CONTROL DE SUPERADMIN) */}
      <NavigationTabs isAdmin={data.admin ?? false} isSuperAdmin={data.superAdmin ?? false} />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow py-8 md:py-12 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* ÁREA DE CONTENIDO PRINCIPAL */}
          <div className="flex-1 bg-white rounded-[3.5rem] p-8 md:p-14 shadow-xl shadow-stone-200/40 border border-stone-200/70 transition-all">
            <Outlet context={{ user: data }} />
          </div>

          {/* SIDEBAR DE RESUMEN Y ESTADO */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-[3.5rem] p-8 md:p-10 border border-stone-200/70 sticky top-28 space-y-8 shadow-xl shadow-stone-200/40">
              
              {/* Encabezado del Sidebar */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-5">
                <h3 className="text-[10px] uppercase tracking-[0.35em] text-[#2897A3] font-black flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-[#D4C363]" />
                  {data.admin || data.superAdmin ? "Panel Admin" : "Resumen Membresía"}
                </h3>
                {(data.admin || data.superAdmin) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#2897A3]/10 border border-[#2897A3]/20 text-[#2897A3] text-[9px] font-bold uppercase tracking-widest rounded-full">
                    <ShieldCheckIcon className="h-3 w-3" />
                    {data.superAdmin ? "Super Admin" : "Verified"}
                  </span>
                )}
              </div>
              
              {/* Profile Highlight Card */}
              <div className="flex flex-col items-center py-4">
                <div className="relative group">
                  <div className={`absolute -inset-2 bg-gradient-to-tr ${data.superAdmin ? 'from-[#D4C363] via-[#2897A3] to-stone-900' : data.admin ? 'from-[#2897A3] via-[#D4C363] to-stone-900' : 'from-[#D4C363] to-[#2897A3]'} rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-700`}></div>
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-stone-900 flex items-center justify-center">
                    {data.image ? (
                      <img src={data.image} alt={data.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-4xl font-serif italic text-[#D4C363]">
                        {data.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-center space-y-1.5">
                  <h2 className="text-sm uppercase tracking-[0.35em] text-stone-800 font-black">
                    {data.name}
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4C363] font-bold">
                    @{data.handle || "lecocom"}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-4 py-1.5 bg-stone-100 text-stone-600 text-[9px] uppercase tracking-[0.2em] font-bold rounded-full border border-stone-200/80">
                      {getRoleLabel()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Informes de Estado */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-stone-400">
                  <span>Plataforma</span>
                  <span className="font-bold text-stone-700">Le Cocom v2.0</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-stone-400">
                  <span>Acceso</span>
                  <span className="font-bold text-[#2897A3]">Activo</span>
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
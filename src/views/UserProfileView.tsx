import { Link, Outlet, useLocation } from "react-router-dom";
import NavigationTabs from "../components/NavigationsTabs";
import { Toaster } from "sonner";
import type { User } from "../types";
import FormServices from "../components/FormServices";

type UserProfileViewProps = {
  data: User;
};

export default function UserProfileView({ data }: UserProfileViewProps) {
  const location = useLocation();

  return (

    // CONTENEDOR PRINCIPAL
    <div className="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#2897A3]/10 flex flex-col">
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-9 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm tracking-[0.2em] text-stone-700 font-light leading-none uppercase">
                Le Cocom
              </span>
              <span className="text-[9px] tracking-[0.4em] text-[#2897A3] font-bold">
                {data.admin ? "ADMIN" : "MY WELLNESS"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 border-l border-stone-100 pl-6 ml-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] tracking-[0.3em] text-[#2897A3] font-bold uppercase">
                {data.name}
              </span>
              <button className="text-[9px] uppercase tracking-[0.2em] text-stone-400 hover:text-red-400/70 transition-colors duration-300 font-medium">
                Cerrar Sesión
              </button>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FDFBF9] to-stone-100 border border-stone-200 flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-bold text-[#B5A447] uppercase">
                {data.handle.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <NavigationTabs isAdmin={data.admin ?? false} />

      <main className="flex-grow py-8 md:py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ENLACE "VISITAR PERFIL PÚBLICO" */}
        <div className="flex justify-end mb-8">
          <Link
            className="text-[11px] uppercase tracking-[0.2em] text-[#B5A447] hover:text-[#2897A3] font-bold transition-colors flex items-center gap-2"
            to={`/${data.handle}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="w-8 h-[1px] bg-[#B5A447]/30"></span>
            Ver Perfil Público
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ÁREA DE CONTENIDO PRINCIPAL */}
          <div className="flex-1 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm shadow-stone-200/50 border border-stone-100/50">
            {/* CORRECCIÓN: 
                Si estamos en la ruta de perfil, mostramos el Outlet (edición).
                Si no es perfil y es admin, mostramos el AdminView.
                Si no es ninguna anterior, mostramos el Outlet (cliente normal).
            */}
            {location.pathname.includes('profile') ? (
              <Outlet />
            ) : data.admin ? (
              <FormServices />
            ) : (
              <Outlet />
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-8 border border-stone-100 sticky top-28 space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#2897A3] font-bold border-b border-stone-100 pb-4">
                {data.admin ? "Panel de Gestión" : "Resumen Wellness"}
              </h3>
              
              <div className="flex flex-col items-center py-6 px-4">
                <div className="relative group">
                  <div className={`absolute -inset-1.5 bg-gradient-to-tr ${data.admin ? 'from-[#2897A3]/40 to-stone-200' : 'from-[#B5A447]/20 to-[#2897A3]/30'} rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-500`}></div>
                  <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-stone-50">
                    {data.image ? (
                      <img src={data.image} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-2xl font-light text-stone-300">{data.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-[11px] uppercase tracking-[0.4em] text-[#2897A3] font-bold">{data.name}</h2>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 mt-3">
                    {data.admin ? "Administrator" : "Wellness Member"}
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


import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";


export default function AdminLayout() {
  
   
   return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#2897A3]/10 flex flex-col">
      {/* HEADER DE PANEL */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* LOGO REUTILIZADO */}
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-9 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm tracking-[0.2em] text-stone-700 font-light leading-none uppercase">
                Le Cocom
              </span>
              <span className="text-[9px] tracking-[0.4em] text-[#2897A3] font-bold">
                PANEL
              </span>
            </div>
          </div>

          {/* ACCIONES DE SESIÓN */}
          <div className="flex items-center gap-6">
            <button
              className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-red-400 transition-colors font-semibold"
              onClick={() => {}}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <div className="flex-grow py-8 md:py-12">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* GRID DE CONTENIDO */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ÁREA DE TRABAJO (OUTLET) */}
            <div className="flex-1 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm shadow-stone-200/50 border border-stone-100/50">
              <Outlet />
            </div>

            {/* SIDEBAR LATERAL - Ahora es suave y minimalista */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-8 border border-stone-100 sticky top-28 space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#2897A3] font-bold border-b border-stone-100 pb-4">
                  Resumen / Acciones
                </h3>

                {/* Aquí iría el contenido del sidebar */}
                <div className="space-y-4">
                  <div className="h-20 bg-[#FDFBF9] rounded-2xl border border-dashed border-stone-200 flex items-center justify-center text-[10px] text-stone-400 uppercase tracking-widest">
                    Espacio Lateral
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* TOASTER PERSONALIZADO */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#44403c",
            border: "1px solid #f5f5f4",
            borderRadius: "1rem",
          },
        }}
      />
    </div>
  );
}

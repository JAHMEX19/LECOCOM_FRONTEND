import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {Toaster} from 'sonner'


export default function Header() {

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Colores: Turquesa (#2897A3) | Dorado (#B5A447)
  const linkStyle = (path: string) => 
    `transition-all duration-300 uppercase tracking-[0.15em] text-xs ${
      location.pathname === path 
        ? 'text-[#2897A3] font-semibold' 
        : 'text-stone-500 hover:text-[#B5A447]'
    }`;

  return (
    <>
    <Toaster position='top-right'/>
    <div className="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#2897A3]/10 flex flex-col">
      
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* LOGO */}
            <Link title='Inicio' to="/" className="flex items-center gap-3 shrink-0">
              <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-xl tracking-[0.1em] text-stone-700 font-light">
                  Le Cocom<span className="font-semibold text-[#2897A3]">Spa</span>
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-10">
              <Link to="/" className={linkStyle('/')}>Inicio</Link>
              <Link to="/nosotros" className={linkStyle('/nosotros')}>Nosotros</Link>
              <Link to="/servicios" className={linkStyle('/servicios')}>Servicios</Link>
              
              <Link 
                to="/agenda" 
                className="px-8 py-2.5 bg-[#B5A447] text-white rounded-full hover:bg-[#2897A3] transition-all duration-500 text-[10px] font-bold shadow-lg shadow-[#B5A447]/20 uppercase tracking-widest"
              >
                Reservar
              </Link>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-stone-500 p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 9h16.5m-16.5 6.75h16.5"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAV (DROPDOWN) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-100 animate-in slide-in-from-top duration-300">
            <div className="px-6 py-8 flex flex-col gap-6 text-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className={linkStyle('/')}>Inicio</Link>
              <Link to="/nosotros" onClick={() => setIsMenuOpen(false)} className={linkStyle('/nosotros')}>Nosotros</Link>
              <Link to="/tratamientos" onClick={() => setIsMenuOpen(false)} className={linkStyle('/tratamientos')}>Tratamientos</Link>
              <Link 
                to="/agenda" 
                onClick={() => setIsMenuOpen(false)}
                className="mx-auto w-full max-w-[200px] px-8 py-3 bg-[#B5A447] text-white rounded-full font-bold text-xs"
              >
                Reservar Cita
              </Link>
            </div>
          </div>
        )}
      </header>
      
      {/* CONTENIDO PRINCIPAL - Fluido pero centrado */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        <div className="bg-white rounded-[2rem] p-6 md:p-12 shadow-xl shadow-stone-200/40 min-h-[70vh] border border-white">
          <Outlet />
        </div>
        
      </main>
     
      {/* FOOTER */}
     {/* FOOTER: Estilo Minimalista y Accesible */}
      <footer className="py-20 px-6 bg-[#FCFAF8]">
        <div className="max-w-7xl mx-auto border-t border-stone-200 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            
            {/* IZQUIERDA: Copyright y Crédito */}
            <div className="flex flex-col items-center md:items-start gap-3 order-3 md:order-1">
              <p className="text-stone-400 text-[10px] tracking-[0.4em] uppercase">
                © 2026 Le Cocom Spa — Todos los derechos reservados.
              </p>
              <p className="text-stone-300 text-[9px] tracking-[0.3em] uppercase italic">
                Powered by <span className="text-stone-400 font-medium">Magnus MT</span>
              </p>
            </div>

            {/* CENTRO: Redes Sociales (Iconos grandes para fácil clic) */}
            <div className="flex items-center gap-8 order-1 md:order-2">
              <a href="http://www.facebook.com/lecocomspa" className="hover:opacity-70 transition-opacity">
                <img src="/icon_facebook.svg" alt="Facebook" className="h-10 w-auto" />
              </a>
              <a href="http://www.instagram.com/lecocomspa" className="hover:opacity-70 transition-opacity">
                <img src="/icon_instagram.svg" alt="Instagram" className="h-10 w-auto" />
              </a>
              <a href="https://wa.me/tu-numero" className="hover:opacity-70 transition-opacity">
                <img src="/icon_whatsapp.svg" alt="WhatsApp" className="h-10 w-auto" />
              </a>
            </div>

            {/* DERECHA: Acceso de Usuario */}
            <div className="flex items-center order-2 md:order-3">
              <Link 
                to="/user/login" 
                className="p-2 border border-transparent hover:border-stone-100 rounded-full transition-all"
              >
                <img src="/icon_user.svg" alt="Login" className="h-10 w-auto" />
              </Link>
            </div>

          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
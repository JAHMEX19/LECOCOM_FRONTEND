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
              <Link to="/tratamientos" className={linkStyle('/tratamientos')}>Tratamientos</Link>
              
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
      <footer className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-stone-100 pt-8">
          <p className="text-stone-400 text-[10px] tracking-[0.4em] uppercase order-2 md:order-1">
            © 2026 Le Cocom Spa - Todos los derechos reservados.
          </p>
          <div className="flex gap-6 order-1 md:order-2">
              <a href="http://www.facebook.com/lecocomspa"> <img src="/icon_facebook.svg" alt="Logo" className="h-10 w-auto" /></a>
              <a href="http:///www.instagram.com/lecocomspa"> <img src="/icon_instagram.svg" alt="Logo" className="h-10 w-auto" /></a>
              <a href="http://"> <img src="/icon_whatsapp.svg" alt="Logo" className="h-10 w-auto" /></a>
          </div>
          <div className="flex gap-6 order-1 md:order-2">
              <Link to="/user/login" className={linkStyle('/')}><img src="/icon_user.svg" alt="Logo" className="h-10 w-auto" /></Link>
             
              
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
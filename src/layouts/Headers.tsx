import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Normalizado: text-[13px], tracking-[0.3em] y fuente más pesada para equilibrar con el Nav de Usuario
  const linkStyle = (path: string) => 
    `transition-all duration-500 uppercase tracking-[0.3em] text-[13px] ${
      location.pathname === path 
        ? 'text-[#2897A3] font-black border-b-2 border-[#2897A3] pb-1' 
        : 'text-stone-400 font-medium hover:text-[#B5A447]'
    }`;

  return (
    <>
      <Toaster position='top-right' />
      <div className="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#2897A3]/10 flex flex-col">
        
        {/* HEADER EXPANDIDO Y NORMALIZADO */}
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex justify-between items-center h-28"> {/* h-28 para dar más aire */}
              
              {/* LOGO: Escalado para no verse pequeño ante las nuevas fuentes */}
              <Link to="/" className="flex items-center gap-5 shrink-0 transition-transform hover:scale-105 duration-500">
                <img src="/logo.svg" alt="Logo" className="h-14 w-auto" />
                <span className="text-3xl tracking-[0.1em] text-stone-700 font-light">
                  Le Cocom<span className="font-semibold text-[#2897A3]">Spa</span>
                </span>
              </Link>

              {/* NAV DESKTOP: Espaciado aumentado (gap-16) */}
              <nav className="hidden md:flex items-center gap-16">
                <Link to="/" className={linkStyle('/')}>Inicio</Link>
                <Link to="/nosotros" className={linkStyle('/nosotros')}>Nosotros</Link>
                <Link to="/servicios" className={linkStyle('/servicios')}>Servicios</Link>
                <Link to="/promociones" className={linkStyle('/promociones')}>Promociones</Link>
                
                <Link 
                  to="/agenda" 
                  className="px-12 py-4 bg-[#B5A447] text-white rounded-full hover:bg-stone-900 transition-all duration-700 text-[12px] tracking-[0.3em] uppercase font-black shadow-2xl shadow-[#B5A447]/30 scale-105"
                >
                  Agendar
                </Link>
              </nav>

              {/* MOBILE BUTTON */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-500 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 9h16.5m-16.5 6.75h16.5"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* MAIN: Ultra ancho y con flujo libre */}
        <main className="flex-grow w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <Outlet />
        </main>
       
        {/* FOOTER NORMALIZADO */}
        <footer className="py-28 bg-[#FCFAF8] border-t border-stone-100">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-16">
              
              <div className="flex flex-col items-center md:items-start gap-5">
                <p className="text-stone-400 text-[12px] tracking-[0.5em] uppercase font-bold">
                  © 2026 Le Cocom Spa — Santuario de Bienestar.
                </p>
                <p className="text-stone-300 text-[11px] tracking-[0.4em] uppercase italic">
                  Powered by <span className="text-stone-400 font-black">Magnus MT</span>
                </p>
              </div>

              <div className="flex items-center gap-12">
                {["facebook", "instagram", "whatsapp"].map((social) => (
                  <a key={social} href="#" className="hover:-translate-y-2 transition-transform duration-700">
                    <img src={`/icon_${social}.svg`} alt={social} className="h-12 w-auto" />
                  </a>
                ))}
              </div>

              <Link to="/user/login" className="hover:rotate-12 transition-transform duration-700">
                <img src="/icon_user.svg" alt="Login" className="h-14 w-auto opacity-40 hover:opacity-100 shadow-sm rounded-full" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const linkStyle = (path: string) => 
    `transition-all duration-500 uppercase tracking-[0.3em] text-[13px] ${
      location.pathname === path 
        ? 'text-[#2897A3] font-black border-b-2 border-[#2897A3] pb-1' 
        : 'text-stone-500 font-medium hover:text-[#D4C363]'
    }`;

  const mobileLinkStyle = (path: string) =>
    `block py-3 uppercase tracking-[0.25em] text-sm font-semibold transition-colors ${
      location.pathname === path ? 'text-[#2897A3]' : 'text-stone-700 hover:text-[#D4C363]'
    }`;

  const socialLinks = [
    {
      name: "facebook",
      url: "https://www.facebook.com/lecocomspa",
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/lecocomspa",
    },
    {
      name: "whatsapp",
      url: "https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios",
    },
  ];

  return (
    <>
      <Toaster position='top-right' />
      <div className="min-h-screen bg-[#FDFBF9] font-sans selection:bg-[#2897A3]/10 flex flex-col overflow-x-hidden">
        
        {/* TOP BAR OPCIONAL - INFORMACIÓN DE CONTACTO RÁPIDO */}
        <div className="bg-stone-900 text-stone-300 py-2 px-6 sm:px-12 lg:px-20 text-[11px] tracking-[0.2em] uppercase font-light hidden sm:flex justify-between items-center border-b border-stone-800">
          <span>Ciudad del Carmen, Camp. — Santuario de Bienestar</span>
          <Link to="https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita" className="flex items-center gap-2 hover:text-[#D4C363] transition-colors">
            <PhoneIcon className="h-3.5 w-3.5 text-[#2897A3]" />
            <span>+52 938 151 4024</span>
          </Link>
        </div>

        {/* HEADER STICKY */}
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100 w-full shadow-sm/50">
          <div className="w-full px-6 sm:px-12 lg:px-20">
            <div className="flex justify-between items-center h-20 sm:h-24">
              
              {/* LOGO */}
              <Link to="/" className="flex items-center gap-3 sm:gap-4 shrink-0 transition-transform hover:scale-105 duration-500">
                <img src="/logo.svg" alt="Logo" className="h-10 sm:h-12 w-auto" />
                <span className="text-2xl sm:text-3xl tracking-[0.1em] text-stone-700 font-light">
                  Le Cocom<span className="font-semibold text-[#2897A3]">Spa</span>
                </span>
              </Link>

              {/* NAV DESKTOP */}
              <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
                <Link to="/" className={linkStyle('/')}>Inicio</Link>
                <Link to="/nosotros" className={linkStyle('/nosotros')}>Nosotros</Link>
                <Link to="/servicios" className={linkStyle('/servicios')}>Servicios</Link>
                <Link to="/promociones" className={linkStyle('/promociones')}>Promociones</Link>
                
                <Link 
                  to="https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita"
                  className="px-8 py-3.5 bg-[#D4C363] text-stone-950 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-500 text-[12px] tracking-[0.3em] uppercase font-bold shadow-lg hover:shadow-2xl shadow-[#D4C363]/20 hover:scale-105"
                >
                  Agendar
                </Link>
              </nav>

              {/* MÓVIL: BOTÓN hamburguesa */}
              <div className="lg:hidden flex items-center">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="text-stone-700 p-2 focus:outline-none"
                  aria-label="Abrir menú"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 9h16.5m-16.5 6.75h16.5"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* MÓVIL: DESPLEGABLE RESPONSIVO */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 px-6 py-8 space-y-6 animate-fadeIn shadow-2xl">
              <nav className="flex flex-col space-y-4 text-center">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className={mobileLinkStyle('/')}>Inicio</Link>
                <Link to="/nosotros" onClick={() => setIsMenuOpen(false)} className={mobileLinkStyle('/nosotros')}>Nosotros</Link>
                <Link to="/servicios" onClick={() => setIsMenuOpen(false)} className={mobileLinkStyle('/servicios')}>Servicios</Link>
                <Link to="/promociones" onClick={() => setIsMenuOpen(false)} className={mobileLinkStyle('/promociones')}>Promociones</Link>
                
                <div className="pt-4">
                  <Link 
                    to="https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-block w-full py-4 bg-[#D4C363] text-stone-950 rounded-full text-xs tracking-[0.3em] uppercase font-bold shadow-md"
                  >
                    Agendar Cita
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </header>
        
        {/* MAIN CONTAINER */}
        <main className="flex-grow w-full">
          <Outlet />
        </main>
       
        {/* FOOTER */}
        <footer className="py-20 bg-[#FCFAF8] border-t border-stone-200/60 w-full">
          <div className="w-full px-6 sm:px-12 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              
              <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
                <p className="text-stone-500 text-[11px] sm:text-[12px] tracking-[0.4em] uppercase font-bold">
                  © 2026 Le Cocom Spa — Santuario de Bienestar.
                </p>
                <p className="text-stone-400 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase italic">
                  Powered by <span className="text-stone-600 font-black">Magnus MT</span>
                </p>
              </div>

              {/* REDES SOCIALES DINÁMICAS */}
              <div className="flex items-center gap-8 sm:gap-12">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:-translate-y-1.5 transition-transform duration-500"
                  >
                    <img
                      src={`/icon_${social.name}.svg`}
                      alt={social.name}
                      className="h-8 sm:h-10 w-auto"
                    />
                  </a>
                ))}
              </div>

              <Link to="/user/login" className="hover:rotate-12 transition-transform duration-500">
                <img src="/icon_user.svg" alt="Login" className="h-10 sm:h-12 w-auto opacity-50 hover:opacity-100 rounded-full" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
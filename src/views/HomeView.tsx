import {
  SparklesIcon,
  HeartIcon,
  SunIcon,
  ArrowRightIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import GoogleReviews from "../components/GoogleReviews";

export default function HomeView() {
  return (
    <div className="w-full bg-[#FCFAF8] text-stone-800 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
<section className="relative w-full min-h-[calc(100vh-7rem)] flex items-center justify-center overflow-hidden bg-stone-950 py-16">
  
  {/* Imagen de fondo con Overlay de Alto Contraste */}
  <div className="absolute inset-0 z-0">
    <img
      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=2000"
      alt="Atmósfera de serenidad y bienestar en Le Cocom Spa"
      className="w-full h-full object-cover animate-[slow-zoom_30s_linear_infinite]"
      loading="eager"
    />
    {/* Gradient reforzado y desenfoque suave para legibilidad perfecta */}
    <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/65 to-stone-950/85 backdrop-blur-[2px]"></div>
  </div>

  {/* Contenido Central */}
  <div className="relative z-10 text-center space-y-6 sm:space-y-8 px-6 sm:px-12 lg:px-20 w-full my-auto max-w-7xl mx-auto">
    
    {/* Insignia / Badge con contraste mejorado */}
    <div className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 border border-white/25 rounded-full backdrop-blur-xl bg-black/40 shadow-xl">
      <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-stone-100 font-semibold drop-shadow-sm">
        Una Pausa para la Armonía
      </p>
    </div>

    {/* Título Principal con Text Shadow Profunda */}
    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.1] [text-shadow:_0_4px_20px_rgb(0_0_0_/_90%)]">
      Renace en <br />
      <span className="font-serif italic text-[#D4C363] font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
        Le Cocom Spa
      </span>
    </h1>

    {/* Párrafo Descriptivo con Sombra */}
    <p className="max-w-5xl mx-auto text-stone-100 text-xl sm:text-2xl md:text-3xl font-light leading-relaxed tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
      Un espacio de paz diseñado para restaurar su cuerpo y serenar su mente.
    </p>

    {/* Botón CTA */}
    <div className="pt-4 sm:pt-6">
      <Link
        to="/servicios"
        className="
          inline-flex items-center justify-center
          bg-[#D4C363] text-stone-950 
          px-8 py-4 sm:px-12 sm:py-5
          rounded-full 
          text-xs sm:text-sm 
          uppercase tracking-[0.25em] font-bold 
          hover:bg-white hover:text-stone-950
          transition-all duration-300 
          shadow-2xl hover:shadow-[#D4C363]/30
          transform active:scale-95 hover:scale-105
        "
      >
        Explorar Servicios
      </Link>
    </div>
  </div>

  {/* Indicador de Desplazamiento */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center opacity-75 hover:opacity-100 transition-opacity">
    <span className="text-[10px] text-stone-200 uppercase tracking-[0.3em] mb-2 font-medium drop-shadow-md">
      Descubrir
    </span>
    <div className="w-0.5 h-8 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
  </div>
</section>

      {/* 2. LA PROMESA */}
      <section className="w-full px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
          {[
            {
              icon: <SparklesIcon className="h-8 w-8 sm:h-10 sm:w-10 text-[#B5A447]" />,
              title: "Renovación Total",
              desc: "Tratamientos exclusivos para restaurar la luminosidad de su piel y vitalidad interior.",
            },
            {
              icon: <HeartIcon className="h-8 w-8 sm:h-10 sm:w-10 text-[#2897A3]" />,
              title: "Cuidado Sensorial",
              desc: "Armonizamos su bienestar físico y emocional con aromas y sonidos naturales.",
            },
            {
              icon: <SunIcon className="h-8 w-8 sm:h-10 sm:w-10 text-[#B5A447]" />,
              title: "Santuario Privado",
              desc: "Espacios íntimos diseñados bajo estándares de lujo para su absoluta tranquilidad.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group space-y-6 text-center p-8 sm:p-12 rounded-[2.5rem] bg-white border border-stone-200/60 shadow-sm hover:shadow-2xl hover:shadow-stone-300/30 hover:-translate-y-1 transition-all duration-500 w-full flex flex-col items-center justify-center"
            >
              <div className="h-20 w-20 sm:h-24 sm:w-24 bg-[#FCFAF8] rounded-full flex items-center justify-center border border-stone-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl uppercase tracking-widest font-black text-stone-800">
                {item.title}
              </h3>
              <p className="text-stone-600 text-lg sm:text-xl leading-relaxed italic font-normal">
                "{item.desc}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXPERIENCIAS DESTACADAS */}
      <section className="w-full bg-white py-20 sm:py-32 border-y border-stone-200/70">
        <div className="w-full px-6 sm:px-12 lg:px-20 space-y-12 sm:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 w-full">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#B5A447] font-black">
                Experiencias de Firma
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-stone-800 tracking-tight">
                Nuestros Tratamientos{" "}
                <span className="font-serif italic text-[#2897A3] font-normal">
                  Estrella
                </span>
              </h2>
            </div>
            <Link
              to="/servicios"
              className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-stone-600 hover:text-[#2897A3] transition-colors flex items-center gap-3 group self-start md:self-auto"
            >
              Ver catálogo completo
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 w-full">
            {/* Card 1 */}
            <div className="relative h-[450px] sm:h-[550px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden group shadow-xl bg-stone-900 w-full">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1600"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                alt="Masaje Signature"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 sm:right-12 flex justify-between items-end">
                <div className="space-y-2">
                  <h3 className="text-white text-2xl sm:text-4xl font-light">
                    Masaje Relajante
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold">
                    60 Minutos de Armonía Total
                  </p>
                </div>
                <Link
                  to="https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita"
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#D4C363] hover:text-stone-950 hover:border-transparent transition-all duration-300 hidden sm:inline-block"
                >
                  Agendar
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative h-[450px] sm:h-[550px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden group shadow-xl bg-stone-900 w-full">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1600"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                alt="Facial Oro"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12 sm:right-12 flex justify-between items-end">
                <div className="space-y-2">
                  <h3 className="text-white text-2xl sm:text-4xl font-light">
                    Facial Antienvejecimiento
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold">
                    Cuidado Dérmico Avanzado
                  </p>
                </div>
                <Link
                  to="https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita"
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#D4C363] hover:text-stone-950 hover:border-transparent transition-all duration-300 hidden sm:inline-block"
                >
                  Agendar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN UBICACIÓN & MAPA */}
      <section className="w-full px-6 sm:px-12 lg:px-20 py-20 sm:py-32">
        <div className="w-full space-y-16">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#B5A447] font-black">
              Visítanos
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-stone-800 tracking-tight">
              Encuentra tu{" "}
              <span className="font-serif italic text-[#2897A3]">
                Santuario
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full">
            
            {/* TARJETAS DE INFORMACIÓN INTERACTIVAS */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Dirección */}
              <a 
                href="https://maps.google.com/?q=Le+Cocom+Spa+Ciudad+del+Carmen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-stone-200/60 shadow-sm flex items-start gap-6 hover:border-[#2897A3]/50 transition-colors group"
              >
                <div className="p-4 bg-[#FCFAF8] rounded-2xl border border-stone-100 text-[#2897A3] shrink-0 group-hover:bg-[#2897A3] group-hover:text-white transition-colors">
                  <MapPinIcon className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#B5A447] font-black">
                    Dirección
                  </h4>
                  <p className="text-stone-800 font-medium text-lg leading-snug group-hover:text-[#2897A3] transition-colors">
                    C. 17 93, San Miguel
                  </p>
                  <p className="text-stone-500 text-sm">
                    Ciudad del Carmen, Camp. C.P. 24130
                  </p>
                </div>
              </a>

              {/* Horarios */}
              <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-stone-200/60 shadow-sm flex items-start gap-6">
                <div className="p-4 bg-[#FCFAF8] rounded-2xl border border-stone-100 text-[#B5A447] shrink-0">
                  <ClockIcon className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#B5A447] font-black">
                    Horario de Atención
                  </h4>
                  <p className="text-stone-800 font-medium text-lg">
                    Lunes a Sábado: 10:00 AM — 08:30 PM
                  </p>
                  <p className="text-stone-500 text-sm">
                    Domingos: No laboramos
                  </p>
                </div>
              </div>

              {/* Teléfono */}

                            
              <Link 
                    to="https://wa.me/529381514024?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita"
                className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-stone-200/60 shadow-sm flex items-start gap-6 hover:border-[#2897A3]/50 transition-colors group"
              >
                <div className="p-4 bg-[#FCFAF8] rounded-2xl border border-stone-100 text-[#2897A3] shrink-0 group-hover:bg-[#2897A3] group-hover:text-white transition-colors">
                  <PhoneIcon className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#B5A447] font-black">
                    Contacto Directo
                  </h4>
                  <p className="text-stone-800 font-medium text-lg group-hover:text-[#2897A3] transition-colors">
                    +52 938 151 4024
                  </p>
                  <p className="text-stone-500 text-sm">
                    lecocom.spa0609@gmail.com
                  </p>
                </div>
              </Link>

            </div>

            {/* CONTENEDOR DEL MAPA */}
            <div className="lg:col-span-7 h-[450px] lg:h-auto min-h-[400px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-stone-200/80 shadow-lg relative bg-stone-100">
              <iframe
                title="Ubicación Le Cocom Spa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.823902917736!2d-91.82792542385153!3d18.633959382481693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85f1078cc272effb%3A0xc32b539bff03e9e!2sLe%20Cocom%20Spa%20%26%20Yoga%20Ciudad%20del%20Carmen!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.15) contrast(1.02)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            
          </div>

          {/* SECCIÓN DE RESEÑAS CON BORDE SEPARADOR */}
          <div className="pt-16 sm:pt-24 border-t border-stone-200/60">
            <GoogleReviews />
          </div>

        </div>
      </section>

      {/* 5. FRASE FINAL */}
      <section className="w-full px-6 sm:px-12 text-center py-20 sm:py-32 border-t border-stone-200/50">
        <p className="text-stone-400 font-serif text-2xl sm:text-4xl lg:text-6xl italic leading-relaxed font-light max-w-5xl mx-auto">
          "Donde el alma encuentra su reflejo en la serenidad."
        </p>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `,
        }}
      />
    </div>
  );
}
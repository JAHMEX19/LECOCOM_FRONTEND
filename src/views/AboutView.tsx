import {
  AcademicCapIcon,
  HeartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import certificationsData from "../data/certifications.json";

interface Certification {
  id: string;
  name: string;
  logo: string;
  subtitle: string;
  description: string;
  isHighlight: boolean;
}

export default function AboutView() {
  const certifications: Certification[] = certificationsData;

  return (
    <div className="w-full bg-[#FCFAF8] text-stone-800 overflow-x-hidden space-y-24 sm:space-y-36 py-12 sm:py-20">
      
      {/* 1. HERO SECTION */}
      <section className="w-full px-6 sm:px-12 lg:px-20 text-center space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto">
        <div className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 border border-stone-200 bg-white/60 backdrop-blur-md rounded-full shadow-sm">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#D4C363] font-bold">
            Nuestra Historia
          </p>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-800 tracking-tight leading-[1.1]">
          El arte del{" "}
          <span className="font-serif italic text-[#2897A3] font-normal">
            equilibrio
          </span>{" "}
          absoluto
        </h1>

        <p className="max-w-5xl mx-auto text-stone-700 text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed tracking-wide drop-shadow-sm">
          "Le Cocom Spa nació no como un negocio, sino como un refugio. Un
          espacio donde el tiempo se detiene y la conexión entre el cuerpo y el
          alma se vuelve la prioridad absoluta."
        </p>
      </section>

      {/* 2. EL ORIGEN */}
      <section className="w-full px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 relative group">
            <div className="absolute -inset-4 sm:-inset-6 bg-[#2897A3]/10 rounded-[3rem] sm:rounded-[4rem] -z-10 transition-all duration-700 group-hover:bg-[#2897A3]/20 group-hover:scale-105"></div>
            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80"
              alt="Interior de Le Cocom Spa"
              className="rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl w-full object-cover h-[450px] sm:h-[600px] transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#D4C363] font-black">
                El Comienzo
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-stone-800 tracking-tight leading-tight">
                Fundado en el{" "}
                <span className="text-[#D4C363] font-serif italic font-normal">
                  Corazón de la Calma
                </span>
              </h2>
            </div>

            <p className="text-stone-600 text-lg sm:text-xl md:text-2xl leading-relaxed font-normal">
              Le Cocom Spa nació de un deseo profundo de proteger la salud y el
              bienestar de quienes amamos. Lo que comenzó como una búsqueda
              personal para fortalecer el entorno, se transformó en una vocación
              de vida y un compromiso profesional con la excelencia.
            </p>

            <p className="text-stone-600 text-lg sm:text-xl md:text-2xl leading-relaxed font-normal">
              Hoy, ese impulso de cuidar y servir se materializa en un refugio diseñado
              para acompañarte en tu propio camino hacia el equilibrio, la salud y
              la armonía integral.
            </p>

            <div className="pt-6 border-t border-stone-200/80">
              <p className="text-stone-600 text-xl sm:text-2xl md:text-3xl italic font-serif leading-relaxed">
                "Nuestra misión es que logres conectar con tu paz interior a través de la excelencia técnica y humana."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FILOSOFÍA */}
      <section className="w-full px-6 sm:px-12 lg:px-20">
        <div className="bg-white rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-16 lg:p-20 shadow-xl border border-stone-200/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            
            <div className="text-center space-y-6 flex flex-col items-center group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FCFAF8] border border-stone-100 flex items-center justify-center text-[#2897A3] shadow-inner transition-all duration-500 group-hover:bg-[#2897A3] group-hover:text-white group-hover:scale-110">
                <HeartIcon className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <h3 className="text-lg sm:text-xl uppercase tracking-widest font-black text-stone-800">
                Propósito
              </h3>
              <p className="text-stone-600 text-base sm:text-lg md:text-xl leading-relaxed italic font-normal max-w-sm">
                Nacimos del deseo de servir y proteger, transformando la
                prevención en un arte de cuidado diario.
              </p>
            </div>

            <div className="text-center space-y-6 flex flex-col items-center group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FCFAF8] border border-stone-100 flex items-center justify-center text-[#D4C363] shadow-inner transition-all duration-500 group-hover:bg-[#D4C363] group-hover:text-stone-950 group-hover:scale-110">
                <AcademicCapIcon className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <h3 className="text-lg sm:text-xl uppercase tracking-widest font-black text-stone-800">
                Formación
              </h3>
              <p className="text-stone-600 text-base sm:text-lg md:text-xl leading-relaxed italic font-normal max-w-sm">
                Cada etapa de aprendizaje y certificación internacional consolida nuestra
                excelencia y compromiso profesional.
              </p>
            </div>

            <div className="text-center space-y-6 flex flex-col items-center group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FCFAF8] border border-stone-100 flex items-center justify-center text-[#2897A3] shadow-inner transition-all duration-500 group-hover:bg-[#2897A3] group-hover:text-white group-hover:scale-110">
                <UserGroupIcon className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <h3 className="text-lg sm:text-xl uppercase tracking-widest font-black text-stone-800">
                Conexión
              </h3>
              <p className="text-stone-600 text-base sm:text-lg md:text-xl leading-relaxed italic font-normal max-w-sm">
                Creamos un vínculo auténtico con cada persona, acompañándola en su
                búsqueda de armonía integral y bienestar físico.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TRAYECTORIA Y CERTIFICACIONES DESDE JSON */}
      <section className="w-full px-6 sm:px-12 lg:px-20 py-12 border-t border-stone-200/60">
        <div className="text-center space-y-16">
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-6 sm:gap-12">
              <div className="h-[1px] w-12 sm:w-24 bg-stone-300"></div>
              <span className="text-[#D4C363] text-5xl sm:text-7xl lg:text-8xl font-serif italic tracking-tight drop-shadow-sm">
                +22 años
              </span>
              <div className="h-[1px] w-12 sm:w-24 bg-stone-300"></div>
            </div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.5em] text-stone-500 font-bold">
              de trayectoria profesional de excelencia
            </p>
          </div>

          <div className="space-y-12">
            <div className="inline-block px-8 py-3 bg-white rounded-full border border-stone-200/80 shadow-sm">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-stone-700 font-bold">
                Certificaciones & Estándares
              </p>
            </div>

            {/* CONTENEDOR FLEXWRAP CENTRADO AUTOMÁTICO */}
            <div className="flex flex-wrap justify-center items-stretch gap-8 lg:gap-10 max-w-7xl mx-auto">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="relative group p-8 sm:p-10 rounded-[2.5rem] bg-white border border-stone-200/70 shadow-sm hover:shadow-2xl hover:shadow-stone-300/40 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between items-center text-center space-y-6 overflow-hidden w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2.5rem)] min-w-[260px] max-w-[320px] flex-grow-0 shrink-0"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D4C363] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="w-full h-28 sm:h-32 rounded-2xl bg-[#FCFAF8] border border-stone-100 p-4 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:border-[#D4C363]/30 transition-all duration-500">
                    <img
                      src={cert.logo}
                      alt={`Logo ${cert.name}`}
                      className="max-h-full max-w-full object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                  </div>

                  <div className="space-y-2 w-full pt-2">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D4C363] font-black block">
                      {cert.subtitle}
                    </span>
                    <h4 className="font-bold text-stone-800 text-base sm:text-lg tracking-wider uppercase">
                      {cert.name}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      cert.isHighlight ? 'text-[#2897A3] font-semibold italic' : 'text-stone-500'
                    }`}>
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
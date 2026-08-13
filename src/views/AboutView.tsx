import {
  AcademicCapIcon,
  HeartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import logoIDECC from "../assets/IDECC.jpg";
import logoCMTFN from "../assets/CMTFN.png";
import logoGDC from "../assets/logo.svg"

export default function AboutView() {
  return (
    /* Normalizado a w-full para fluir en el contenedor de 1600px del main */
    <div className="w-full py-12 space-y-40">
      
      {/* HERO SECTION: La Esencia Escalada */}
      <section className="text-center space-y-10 animate-in fade-in slide-in-from-top-10 duration-1000">
        <h2 className="text-[14px] uppercase tracking-[0.8em] text-[#B5A447] font-black">
          Nuestra Historia
        </h2>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-stone-800 tracking-tighter leading-none">
          El arte del{" "}
          <span className="font-serif italic text-[#2897A3]">equilibrio</span>{" "}
          absoluto.
        </h1>
        <p className="max-w-4xl mx-auto text-stone-500 leading-relaxed text-xl md:text-2xl tracking-wide font-light italic">
          "Le Cocom Spa nació no como un negocio, sino como un refugio. Un
          espacio donde el tiempo se detiene y la conexión entre el cuerpo y el
          alma se vuelve la prioridad absoluta."
        </p>
      </section>

      {/* BLOQUE: EL ORIGEN - Ajustado con más aire */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative group">
          <div className="absolute -inset-8 bg-[#2897A3]/5 rounded-[4rem] -z-10 transition-all duration-700 group-hover:bg-[#2897A3]/10"></div>
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80"
            alt="Interior Spa"
            className="rounded-[3.5rem] shadow-2xl shadow-stone-200 w-full object-cover h-[600px] transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
        <div className="space-y-12 px-4 lg:px-8">
          <h3 className="text-4xl md:text-5xl lg:text-6xl text-stone-800 font-light tracking-tight leading-tight">
            Fundado en el{" "}
            <span className="text-[#B5A447] font-semibold italic font-serif">
              Corazón de la Calma
            </span>
          </h3>
          <p className="text-stone-500 text-lg md:text-xl leading-loose font-light">
            Le Cocom Spa nació de un deseo profundo de proteger la salud y el
            bienestar de quienes amamos. Lo que comenzó como una búsqueda
            personal para fortalecer el entorno, se transformó en una vocación
            de vida y un compromiso profesional con la excelencia. 
            <br /><br />
            Hoy, ese impulso de cuidar y servir se materializa en un refugio diseñado
            para acompañarte en tu propio camino hacia el equilibrio, la salud y
            la armonía integral.
          </p>
          <div className="pt-6">
            <div className="h-[1px] w-24 bg-[#B5A447] mb-8"></div>
            <p className="text-stone-400 text-lg md:text-xl italic font-serif leading-relaxed">
              "Nuestra misión es que logres conectar con tu paz interior a través de la excelencia técnica y humana."
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE: FILOSOFÍA - Tarjetas Normalizadas */}
      <section className="bg-white rounded-[5rem] p-16 md:p-32 shadow-2xl shadow-stone-200/50 border border-stone-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* Propósito */}
          <div className="text-center space-y-8 flex flex-col items-center group">
            <div className="w-20 h-20 rounded-[2rem] bg-[#2897A3]/10 flex items-center justify-center text-[#2897A3] mb-4 transition-all duration-700 group-hover:bg-[#2897A3] group-hover:text-white group-hover:rotate-6">
              <HeartIcon className="h-10 w-10" />
            </div>
            <h4 className="text-[15px] uppercase tracking-[0.5em] font-black text-stone-700">
              Propósito
            </h4>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-[300px] font-light">
              Nacimos del deseo de servir y proteger, transformando la
              prevención en un arte de cuidado diario.
            </p>
          </div>

          {/* Formación */}
          <div className="text-center space-y-8 flex flex-col items-center group">
            <div className="w-20 h-20 rounded-[2rem] bg-[#B5A447]/10 flex items-center justify-center text-[#B5A447] mb-4 transition-all duration-700 group-hover:bg-[#B5A447] group-hover:text-white group-hover:-rotate-6">
              <AcademicCapIcon className="h-10 w-10" />
            </div>
            <h4 className="text-[15px] uppercase tracking-[0.5em] font-black text-stone-700">
              Formación
            </h4>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-[300px] font-light">
              Cada etapa de aprendizaje y certificación internacional consolida nuestra
              excelencia y compromiso profesional.
            </p>
          </div>

          {/* Conexión */}
          <div className="text-center space-y-8 flex flex-col items-center group">
            <div className="w-20 h-20 rounded-[2rem] bg-[#2897A3]/10 flex items-center justify-center text-[#2897A3] mb-4 transition-all duration-700 group-hover:bg-[#2897A3] group-hover:text-white group-hover:rotate-6">
              <UserGroupIcon className="h-10 w-10" />
            </div>
            <h4 className="text-[15px] uppercase tracking-[0.5em] font-black text-stone-700">
              Conexión
            </h4>
            <p className="text-stone-400 text-base md:text-lg leading-relaxed max-w-[300px] font-light">
              Creamos un vínculo auténtico con cada persona, acompañándola en su
              búsqueda de armonía integral y bienestar físico.
            </p>
          </div>
        </div>
      </section>

      {/* TRAYECTORIA Y CERTIFICACIONES - Escalado Ultra Wide */}
      <section className="text-center space-y-24 pb-20 border-t border-stone-100 pt-32">
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] w-24 bg-stone-200"></div>
            <span className="text-[#B5A447] text-6xl md:text-7xl lg:text-8xl font-serif italic tracking-tighter">
              +22 años
            </span>
            <div className="h-[1px] w-24 bg-stone-200"></div>
          </div>
          <p className="text-[14px] uppercase tracking-[0.8em] text-stone-400 font-bold">
            de trayectoria profesional de excelencia
          </p>
        </div>

        <div className="space-y-20">
          <div className="inline-block px-12 py-4 bg-stone-50 rounded-full border border-stone-100 shadow-sm">
            <p className="text-[13px] uppercase tracking-[0.5em] text-stone-500 font-black">
              Certificaciones Internacionales & Estándares
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-start gap-x-32 gap-y-24 px-4 max-w-[1400px] mx-auto">
            {/* Institución 1 */}
            <div className="flex flex-col items-center space-y-8 max-w-[300px] group transition-all duration-500">
              <img 
                src={logoIDECC} 
                alt="Logo IDECC" 
                className="h-20 md:h-24 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              />
              <div className="text-center space-y-3">
                <p className="font-serif text-[18px] text-stone-700 tracking-[0.2em] uppercase font-bold">
                  IDECC
                </p>
                <p className="text-[11px] text-stone-400 tracking-[0.2em] leading-relaxed uppercase font-bold">
                  INSTITUTO DE ESTÉTICA, COSMETOLOGÍA Y COSMIATRÍA
                </p>
              </div>
            </div>

            {/* Institución 2 */}
            <div className="flex flex-col items-center space-y-8 max-w-[300px] group transition-all duration-500">
              <img 
                src={logoCMTFN} 
                alt="Logo CMTFN" 
                className="h-20 md:h-24 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              />
              <div className="text-center space-y-3">
                <p className="font-serif text-[18px] text-stone-700 tracking-[0.2em] uppercase font-bold">
                  CMTFN
                </p>
                <p className="text-[11px] text-stone-400 tracking-[0.2em] leading-relaxed uppercase font-bold">
                  Colegio Mexicano de Terapeutas Florales y Naturales A.C.
                </p>
              </div>
            </div>

            {/* Institución 3 */}
            <div className="flex flex-col items-center space-y-8 max-w-[300px] group transition-all duration-500">
              <img 
                src={logoGDC} 
                alt="Logo GDC" 
                className="h-20 md:h-24 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              />
              <div className="text-center space-y-3">
                <p className="font-serif text-[18px] text-stone-700 tracking-[0.2em] uppercase font-bold">
                  GDC
                </p>
                <p className="text-[11px] text-[#2897A3] tracking-[0.2em] leading-relaxed uppercase italic font-black">
                  Certificación Internacional
                </p>
              </div>
            </div>

            {/* Institución 4 */}
            <div className="flex flex-col items-center space-y-8 max-w-[300px] group transition-all duration-500">
              <img 
                src={logoGDC} 
                alt="Logo GDC" 
                className="h-20 md:h-24 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              />
              <div className="text-center space-y-3">
                <p className="font-serif text-[18px] text-stone-700 tracking-[0.2em] uppercase font-bold">
                  GDC
                </p>
                <p className="text-[11px] text-[#2897A3] tracking-[0.2em] leading-relaxed uppercase italic font-black">
                  Fisioyoga
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
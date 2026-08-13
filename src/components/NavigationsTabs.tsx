import { BookmarkSquareIcon, UserIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

const userTabs = [
  { name: "My Wellness", href: "/auth/wellness", icon: BookmarkSquareIcon },
  { name: "Mi Perfil", href: "/auth/profile", icon: UserIcon },
];

const adminTabs = [
  { name: "Mi Perfil", href: "/auth/profile", icon: UserIcon },
  { name: "Promociones", href: "/auth/admin/promociones", icon: CameraIcon},
  { name: "Servicios", href: "/auth/admin/servicios", icon: SparklesIcon},
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type NavigationTabsProps = {
  isAdmin: boolean;
};

export default function NavigationTabs({ isAdmin }: NavigationTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = isAdmin ? adminTabs : userTabs;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };

  return (
    /* Mantenemos el max-w de 1600px para consistencia con el catálogo */
    <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mt-16 mb-12">
      
      {/* VISTA MÓVIL */}
      <div className="sm:hidden">
        <select
          id="tabs"
          className="block w-full rounded-[2rem] border-stone-200 bg-white py-5 pl-6 pr-12 text-stone-600 focus:border-[#2897A3] focus:ring-[#2897A3] text-sm tracking-widest uppercase font-black shadow-xl"
          onChange={handleChange}
          value={location.pathname}
        >
          {tabs.map((tab) => (
            <option value={tab.href} key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* VISTA DESKTOP: Navegación de alto impacto */}
      <div className="hidden sm:block">
        <div className="border-b border-stone-200/50">
          <nav className="-mb-px flex space-x-20" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.href;

              return (
                <Link
                  key={tab.name}
                  to={tab.href}
                  className={classNames(
                    isActive
                      ? "border-[#2897A3] text-[#2897A3] font-black"
                      : "border-transparent text-stone-300 hover:text-[#B5A447] hover:border-[#B5A447]/30",
                    /* Fuente subida a 15px (text-[15px]) y tracking aumentado a 0.5em */
                    "group inline-flex items-center border-b-[3px] py-8 px-2 text-[15px] uppercase tracking-[0.5em] transition-all duration-700 ease-out"
                  )}
                >
                  <tab.icon
                    className={classNames(
                      isActive ? "text-[#2897A3]" : "text-stone-200 group-hover:text-[#B5A447]",
                      /* Icono escalado a h-6 para balancear la fuente de 15px */
                      "-ml-1 mr-5 h-6 w-6 transition-colors duration-700"
                    )}
                  />
                  <span className="relative">
                    {tab.name}
                    {/* Efecto de barra sutil en hover para las no activas */}
                    {!isActive && (
                      <span className="absolute -bottom-[35px] left-0 w-0 h-[3px] bg-[#B5A447]/20 group-hover:w-full transition-all duration-500" />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
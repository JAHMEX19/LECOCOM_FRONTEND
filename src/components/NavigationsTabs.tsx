import { BookmarkSquareIcon, UserIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Pestañas para Clientes Normales
const userTabs = [
  { name: "My Wellness", href: "/user/wellness", icon: BookmarkSquareIcon },
  { name: "Mi Perfil", href: "/user/profile", icon: UserIcon },
];

// Pestañas para Administradores
const adminTabs = [
  { name: "Servicios", href: "/admin", icon: SparklesIcon},
  //{ name: "Gestión Citas", href: "/admin/citas", icon: CalendarIcon },
  { name: "Mi Perfil", href: "/user/profile", icon: UserIcon },
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

  // Seleccionamos las pestañas según el rol
  const tabs = isAdmin ? adminTabs : userTabs;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-6">
      {/* VISTA MÓVIL */}
      <div className="sm:hidden">
        <select
          id="tabs"
          className="block w-full rounded-2xl border-stone-200 bg-white py-3.5 pl-4 pr-10 text-stone-600 focus:border-[#2897A3] focus:ring-[#2897A3] text-xs tracking-widest uppercase font-medium shadow-sm"
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

      {/* VISTA DESKTOP */}
      <div className="hidden sm:block">
        <div className="border-b border-stone-200/60">
          <nav className="-mb-px flex space-x-12" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.href;

              return (
                <Link
                  key={tab.name}
                  to={tab.href}
                  className={classNames(
                    isActive
                      ? "border-[#2897A3] text-[#2897A3] font-bold"
                      : "border-transparent text-stone-400 hover:text-[#B5A447] hover:border-[#B5A447]/30",
                    "group inline-flex items-center border-b-2 py-4 px-1 text-[11px] uppercase tracking-[0.25em] transition-all duration-500",
                  )}
                >
                  <tab.icon
                    className={classNames(
                      isActive ? "text-[#2897A3]" : "text-stone-300 group-hover:text-[#B5A447]",
                      "-ml-0.5 mr-3 h-4 w-4 transition-colors duration-500",
                    )}
                  />
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
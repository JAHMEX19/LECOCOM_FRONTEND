import { BookmarkSquareIcon, UserIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { CameraIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

const userTabs = [
  { name: "My Wellness", href: "/auth/wellness", icon: BookmarkSquareIcon },
  { name: "Mi Perfil", href: "/auth/profile", icon: UserIcon },
];

const baseAdminTabs = [
  { name: "Mi Perfil", href: "/auth/profile", icon: UserIcon },
  { name: "Promociones", href: "/auth/admin/promociones", icon: CameraIcon },
  { name: "Servicios", href: "/auth/admin/servicios", icon: SparklesIcon },
];

const superAdminTabs = [
  { name: "Crear Usuario", href: "/auth/admin/register", icon: UserPlusIcon },
  { name: "Usuarios", href: "/auth/admin/users", icon: UserGroupIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type NavigationTabsProps = {
  isAdmin: boolean;
  isSuperAdmin?: boolean;
};

export default function NavigationTabs({ isAdmin, isSuperAdmin = false }: NavigationTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Construcción dinámica de pestañas según jerarquía
  let tabs = userTabs;
  if (isAdmin || isSuperAdmin) {
    tabs = [...baseAdminTabs];
    if (isSuperAdmin) {
      tabs.push(...superAdminTabs);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mt-8 mb-10">
      
      {/* VISTA MÓVIL: Select flotante redondeado */}
      <div className="sm:hidden">
        <div className="relative">
          <select
            id="tabs"
            className="block w-full rounded-2xl border border-stone-200/80 bg-white/90 backdrop-blur-md py-4 pl-5 pr-10 text-stone-700 focus:border-[#2897A3] focus:ring-[#2897A3] text-xs tracking-[0.2em] uppercase font-bold shadow-lg shadow-stone-200/50 appearance-none outline-none"
            onChange={handleChange}
            value={location.pathname}
          >
            {tabs.map((tab) => (
              <option value={tab.href} key={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* VISTA DESKTOP: Navegación estilo Cápsula Bento Flotante */}
      <div className="hidden sm:block">
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-full border border-stone-200/70 shadow-lg shadow-stone-200/30 inline-flex items-center">
          <nav className="flex space-x-2" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.href;

              return (
                <Link
                  key={tab.name}
                  to={tab.href}
                  className={classNames(
                    isActive
                      ? "bg-stone-900 text-white shadow-md shadow-stone-900/10 font-bold"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/70 font-medium",
                    "inline-flex items-center px-6 py-3 rounded-full text-xs uppercase tracking-[0.25em] transition-all duration-300 ease-out group cursor-pointer"
                  )}
                >
                  <tab.icon
                    className={classNames(
                      isActive
                        ? "text-[#D4C363]"
                        : "text-stone-400 group-hover:text-[#2897A3]",
                      "mr-3 h-4 w-4 transition-colors duration-300"
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
import { Switch, Button } from "@headlessui/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import type { Tratamiento } from "../types";
import { classNames } from "../utils";

type ServiciosInputProps = {
  item?: Tratamiento
  handleAddServicio?: (e:React.ChangeEvent<HTMLInputElement>) => void
};

// --- Estilos Reutilizables para mantener consistencia ---
const labelStyle =
  "text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold ml-1";
const inputStyle =
  "w-full bg-white border border-stone-100 p-4 rounded-2xl text-xs text-stone-600 focus:ring-1 focus:ring-[#2897A3] focus:border-[#2897A3] outline-none transition-all shadow-sm placeholder:text-stone-300";

export default function ServiciosInput({ item ,handleAddServicio}: ServiciosInputProps) {
  return (
    <div className="flex flex-col space-y-8">
      {/* 1. FORMULARIO DE NUEVO SERVICIO (Creación) */}
      <section>
        <h3 className="text-xs font-bold text-stone-400 mb-4 ml-2 uppercase tracking-widest">
          Agregar Nuevo
        </h3>
        <form className="bg-[#FDFBF9] border-2 border-dashed border-stone-200 p-8 rounded-[2.5rem] transition-all hover:border-[#B5A447]/30 group">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-5 flex flex-col space-y-3">
              <label className={labelStyle}>Nombre del Servicio</label>
              <input
                type="text"
                placeholder="Ej. Masaje con Piedras Volcánicas"
                className={inputStyle}
                value={item?.nombre || ""}
                onChange={handleAddServicio}
                name={item?.nombre}
              />
            </div>

            <div className="md:col-span-3 flex flex-col space-y-3">
              <label className={labelStyle}>Categoría</label>
              <select className={`${inputStyle} appearance-none`}>
                <option value="">Seleccionar...</option>
                <option value="masajes">Masajes</option>
                <option value="faciales">Faciales</option>
                <option value="corporales">Corporales</option>
              </select>
            </div>

            <div className="md:col-span-2 flex flex-col space-y-3">
              <label className={labelStyle}>Duración</label>
              <div className="relative">
                <input type="number" placeholder="60" className={inputStyle} />
                <span className="absolute right-4 top-4 text-[10px] text-stone-300 font-bold">
                  MIN
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <Button
                type="submit"
                className="w-full bg-[#B5A447] hover:bg-[#2897A3] text-white h-[40px] rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg shadow-[#B5A447]/20 group-hover:shadow-[#2897A3]/20"
              >
                <PlusIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </form>
      </section>

      {/* 2. FORMULARIO DE EDICIÓN (Item de Lista) */}
      <section>
        <h3 className="text-xs font-bold text-stone-400 mb-4 ml-2 uppercase tracking-widest">
          Servicio Existente
        </h3>
        <div className="bg-white border border-stone-100 p-6 rounded-3xl shadow-sm transition-hover duration-300 hover:bg-stone-50/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            {/*/ --- Campos Prellenados con Datos del Servicio (Edición) ---  /*/}
            <div className="md:col-span-4 flex flex-col space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] text-stone-400 ml-1">
                Nombre
              </label>
              <input
                type="text"
                defaultValue={item?.nombre}
                className="bg-white border border-stone-100 p-3 rounded-xl text-xs text-stone-600 focus:ring-1 focus:ring-[#2897A3] outline-none"
              />
            </div>

            <div className="md:col-span-3 flex flex-col space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] text-stone-400 ml-1">
                Categoría
              </label>
              <input
                type="text"
                defaultValue={item?.grupo}
                className="bg-white border border-stone-100 p-3 rounded-xl text-xs text-stone-600 focus:ring-1 focus:ring-[#2897A3] outline-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] text-stone-400 ml-1">
                Duración
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue={item?.duracion}
                  className="w-full bg-white border border-stone-100 p-3 rounded-xl text-xs text-stone-600"
                />
                <span className="absolute right-3 top-3 text-[10px] text-stone-300">
                  min
                </span>
              </div>
            </div>

            <div className="md:col-span-3 flex items-center justify-end gap-6">
              <Switch
                checked={item?.enabled}
                onChange={() => {}}
                className={classNames(
                  item?.enabled ? "bg-blue-500" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    item?.enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  )}
                />
              </Switch>

              <Button onChange={() => {}} className="p-3 rounded-xl bg-stone-50 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all">
                
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@headlessui/react";
import { TrashIcon, PencilSquareIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";
import type { Servicio } from "../types";
import { deleteServicio, updateServicio } from "../api/LeCocomApi";

type ServiciosInputProps = {
  item: Servicio;
};

export default function ServiciosInput({ item }: ServiciosInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, control } = useForm<Servicio>({
    defaultValues: item
  });

  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updateServicio,
    onSuccess: () => {
      toast.success("Servicio actualizado");
      queryClient.invalidateQueries({ queryKey: ["servicios"] });
      setIsEditing(false);
    },
    onError: (error) => toast.error(error.message)
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteServicio,
    onSuccess: () => {
      toast.success("Servicio eliminado");
      queryClient.invalidateQueries({ queryKey: ["servicios"] });
    },
    onError: (error) => toast.error(error.message)
  });

  const onSubmit = (data: Servicio) => mutateUpdate(data);

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const inputEditStyle = "w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl text-xs text-stone-600 focus:ring-1 focus:ring-[#2897A3] outline-none transition-all disabled:opacity-50";

  return (
    <div className={`bg-white border transition-all duration-300 p-5 rounded-[2rem] shadow-sm mb-4 ${
      isEditing ? 'border-[#2897A3] ring-1 ring-[#2897A3]/10 shadow-lg' : 'border-stone-100 hover:border-stone-200'
    }`}>
      
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            {/* Nombre */}
            <div className="md:col-span-2">
              <label className="text-[8px] uppercase text-stone-400 font-bold ml-1 mb-1 block">Nombre del Servicio</label>
              <input {...register("name", { required: true })} className={inputEditStyle} disabled={isUpdating} />
            </div>

            {/* Minutos y Precio */}
            <div className="grid grid-cols-2 gap-2 md:col-span-1">
              <div>
                <label className="text-[8px] uppercase text-stone-400 font-bold ml-1 mb-1 block">Minutos</label>
                <input type="number" {...register("duration", { valueAsNumber: true })} className={inputEditStyle} disabled={isUpdating} />
              </div>
              <div>
                <label className="text-[8px] uppercase text-stone-400 font-bold ml-1 mb-1 block">Precio ($)</label>
                <input type="number" {...register("price", { valueAsNumber: true })} className={inputEditStyle} disabled={isUpdating} />
              </div>
            </div>

            {/* Switch de Visibilidad */}
            <div className="flex flex-col items-center justify-center bg-stone-50 p-2 rounded-xl border border-stone-100">
              <label className="text-[8px] uppercase text-stone-400 font-bold mb-2">Visible</label>
              <Controller
                name="enabled"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    className={`${field.value ? "bg-[#2897A3]" : "bg-stone-200"} relative inline-flex h-5 w-10 items-center rounded-full transition-colors outline-none`}
                  >
                    <span className={`${field.value ? "translate-x-6" : "translate-x-1"} inline-block h-3 w-3 transform rounded-full bg-white transition-transform`} />
                  </Switch>
                )}
              />
            </div>
          </div>

          {/* NUEVO CAMPO: Descripción */}
          <div>
            <label className="text-[8px] uppercase text-stone-400 font-bold ml-1 mb-1 block">Descripción del Servicio</label>
            <textarea 
              {...register("description")} 
              rows={2}
              placeholder="Ej: Masaje relajante con aceites esenciales..."
              className={`${inputEditStyle} resize-none`} 
              disabled={isUpdating} 
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-2 pt-2 border-t border-stone-50">
            <button type="button" onClick={handleCancel} className="px-4 py-2 rounded-xl bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-stone-200 transition-colors">
              <XMarkIcon className="h-4 w-4"/> Cancelar
            </button>
            <button type="submit" disabled={isUpdating} className="px-6 py-2 rounded-xl bg-[#2897A3] text-white text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-[#1e737c] transition-colors shadow-sm">
              <CheckIcon className="h-4 w-4" /> {isUpdating ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 min-w-[200px]">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#2897A3] font-bold mb-0.5">{item.group}</p>
            <h4 className="text-sm font-bold text-stone-700 leading-tight">{item.name}</h4>
            {/* Visualización de la descripción */}
            {item.description && (
              <p className="text-xs text-stone-400 mt-1 line-clamp-1 italic">{item.description}</p>
            )}
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <div className="text-center">
              <p className="text-[8px] uppercase text-stone-400 font-bold mb-0.5">Duración</p>
              <p className="text-xs text-stone-600 font-bold">{item.duration} min</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] uppercase text-stone-400 font-bold mb-0.5">Precio</p>
              <p className="text-xs text-stone-600 font-bold">${item.price}</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase text-stone-300 font-bold">Visible</span>
              <div className={`${item.enabled ? "bg-[#2897A3]" : "bg-stone-200"} relative inline-flex h-5 w-10 items-center rounded-full opacity-80 transition-colors`}>
                <span className={`${item.enabled ? "translate-x-6" : "translate-x-1"} inline-block h-3 w-3 transform rounded-full bg-white transition-transform`} />
              </div>
            </div>

            <div className="flex items-center gap-2 border-l border-stone-100 pl-4">
              <button onClick={() => setIsEditing(true)} className="p-2.5 rounded-xl bg-stone-50 text-stone-300 hover:text-[#B5A447] hover:bg-[#B5A447]/5 transition-all">
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button onClick={() => confirm(`¿Eliminar definitivamente "${item.name}"?`) && mutateDelete(item.handle)} className="p-2.5 rounded-xl bg-stone-50 text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
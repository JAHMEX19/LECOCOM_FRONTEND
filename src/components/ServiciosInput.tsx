import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@headlessui/react";
import {
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import { toast } from "sonner";
import type { Servicio } from "../types";
import {
  deleteServicio,
  updateServicio,
  upLoadServiceImage,
} from "../api/LeCocomApi";

type ServiciosInputProps = {
  item: Servicio;
};

export default function ServiciosInput({ item }: ServiciosInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, control, setValue, watch } =
    useForm<Servicio>({
      defaultValues: item,
    });

  const currentImage = watch("image");

  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updateServicio,
    onSuccess: () => {
      toast.success("Servicio actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["servicios"] });
      setIsEditing(false);
    },
    onError: (error) => toast.error(error.message),
  });

  const uploadMutation = useMutation({
    mutationFn: upLoadServiceImage,
    onSuccess: (url) => {
      if (url) {
        setValue("image", url, { shouldDirty: true });
      }
      toast.success("Imagen cargada con éxito");
    },
    onError: (error) => toast.error(error.message || "Error al subir la imagen"),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadMutation.mutate(e.target.files[0]);
    }
  };

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteServicio,
    onSuccess: () => {
      toast.success("Servicio eliminado");
      queryClient.invalidateQueries({ queryKey: ["servicios"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data: Servicio) => mutateUpdate(data);

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const labelStyle = "text-[9px] uppercase tracking-[0.2em] text-stone-600 font-bold ml-1 mb-1.5 block";
  const inputEditStyle = "w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-2xl text-xs text-stone-700 focus:ring-2 focus:ring-[#2897A3]/20 focus:border-[#2897A3] outline-none transition-all disabled:opacity-50 placeholder:text-stone-300 font-medium";

  return (
    <div
      className={`bg-white border transition-all duration-300 p-6 sm:p-7 rounded-[2.5rem] shadow-sm mb-5 ${
        isEditing
          ? "border-[#2897A3] ring-4 ring-[#2897A3]/10 shadow-xl"
          : "border-stone-200/70 hover:border-stone-300 hover:shadow-md"
      }`}
    >
      {isEditing ? (
        /* MODO EDICIÓN */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Imagen de Previsualización y Carga */}
            <div className="md:col-span-4 lg:col-span-3">
              <label className={labelStyle}>Imagen del Servicio</label>
              <div className="relative group aspect-video md:aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                {currentImage ? (
                  <img
                    src={currentImage}
                    className={`h-full w-full object-cover transition-all duration-500 ${uploadMutation.isPending ? "scale-105 blur-sm opacity-50" : "opacity-100"}`}
                    alt="Preview"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-stone-100">
                    <PhotoIcon className="h-8 w-8 text-stone-300" />
                  </div>
                )}
                
                {uploadMutation.isPending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <label className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <span className="text-[10px] text-white font-bold uppercase tracking-[0.2em]">Cambiar Imagen</span>
                </label>
              </div>
              <input type="hidden" {...register("image")} />
            </div>

            {/* Datos del Servicio */}
            <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-4">
                <label className={labelStyle}>Nombre del Servicio</label>
                <input
                  {...register("name", { required: true })}
                  className={inputEditStyle}
                  disabled={isUpdating}
                />
              </div>

              {/* Switch Visibilidad */}
              <div className="md:col-span-2 flex flex-col items-center justify-center bg-stone-50/80 p-2 rounded-2xl border border-stone-200/70">
                <label className="text-[9px] uppercase text-stone-600 font-bold mb-1.5 tracking-[0.2em]">Visible</label>
                <Controller
                  name="enabled"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                      className={`${field.value ? "bg-[#2897A3]" : "bg-stone-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none cursor-pointer`}
                    >
                      <span className={`${field.value ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md`} />
                    </Switch>
                  )}
                />
              </div>

              {/* 🟢 NUEVO CAMPO: Categoría (Group) */}
              <div className="md:col-span-6">
                <label className={labelStyle}>Categoría</label>
                <select
                  {...register("group", { required: true })}
                  className={`${inputEditStyle} appearance-none cursor-pointer`}
                  disabled={isUpdating}
                >
                  <option value="terapéuticos">Masajes Terapéuticos</option>
                  <option value="personalizados">Masajes Personalizados</option>
                  <option value="corpo-facial holístico">Masaje Corpo-Facial Holístico</option>
                  <option value="reductivos">Masajes Reductivos</option>
                  <option value="combinados">Masajes Combinados</option>
                  <option value="faciales">Faciales</option>
                  <option value="masaje facial">Masaje facial</option>
                  <option value="exfoliaciones">Exfoliaciones Corpo Facial</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className={labelStyle}>Duración (Minutos)</label>
                <input
                  type="number"
                  {...register("duration", { valueAsNumber: true })}
                  className={inputEditStyle}
                  disabled={isUpdating}
                />
              </div>

              <div className="md:col-span-3">
                <label className={labelStyle}>Precio ($ MXN)</label>
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className={inputEditStyle}
                  disabled={isUpdating}
                />
              </div>

              <div className="md:col-span-6">
                <label className={labelStyle}>Descripción Corta</label>
                <textarea
                  {...register("description")}
                  rows={2}
                  className={`${inputEditStyle} resize-none leading-relaxed`}
                  disabled={isUpdating}
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4" /> Cancelar
            </button>
            <button
              type="submit"
              disabled={isUpdating || uploadMutation.isPending}
              className="px-6 py-2.5 rounded-xl bg-[#D4C363] text-stone-950 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-md active:scale-95 cursor-pointer disabled:bg-stone-200"
            >
              {isUpdating ? <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" /> : <CheckIcon className="h-4 w-4" />}
              Guardar Cambios
            </button>
          </div>
        </form>
      ) : (
        /* MODO LECTURA */
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-5 flex-1 min-w-0">
            <div className="h-20 w-28 rounded-2xl overflow-hidden flex-shrink-0 border border-stone-200/80 shadow-sm bg-stone-100">
              {item.image ? (
                <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-stone-100">
                  <PhotoIcon className="h-6 w-6 text-stone-300" />
                </div>
              )}
            </div>
            <div className="truncate space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2897A3]/10 text-[#2897A3] text-[9px] font-bold tracking-widest uppercase border border-[#2897A3]/20 inline-block">
                {item.group || "Ritual"}
              </span>
              <h4 className="text-base font-serif italic text-stone-800 truncate font-normal">{item.name}</h4>
              <p className="text-xs text-stone-500 italic line-clamp-1 font-light">"{item.description || "Sin descripción disponible"}"</p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
            <div className="flex gap-6 sm:gap-8">
              <div className="text-center">
                <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">Tiempo</p>
                <p className="text-xs font-bold text-stone-700 mt-0.5">{item.duration} min</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">Inversión</p>
                <p className="text-xs font-bold text-stone-700 mt-0.5">${item.price}</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">Visibilidad</p>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-50 border border-stone-200/60">
                  <div className={`h-1.5 w-1.5 rounded-full ${item.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`} />
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${item.enabled ? 'text-stone-700' : 'text-stone-400'}`}>
                    {item.enabled ? 'Visible' : 'Oculto'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-6 border-l border-stone-100">
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 rounded-xl bg-stone-50 text-stone-400 hover:text-[#D4C363] hover:bg-stone-900 transition-all duration-300 cursor-pointer shadow-sm"
                title="Editar Servicio"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => confirm(`¿Eliminar definitivamente el servicio "${item.name}"?`) && mutateDelete(item.handle)}
                className="p-3 rounded-xl bg-stone-50 text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300 cursor-pointer shadow-sm"
                title="Eliminar Servicio"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
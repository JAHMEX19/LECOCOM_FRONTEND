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
      toast.success("Servicio actualizado");
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
      toast.success("Imagen cargada");
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

  const labelStyle = "text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold ml-1 mb-1.5 block";
  const inputEditStyle = "w-full bg-white border border-stone-100 px-4 py-2.5 rounded-xl text-xs text-stone-600 focus:ring-1 focus:ring-[#2897A3] outline-none transition-all shadow-sm disabled:opacity-50";

  return (
    <div
      className={`bg-white border transition-all duration-500 p-6 rounded-[2.5rem] mb-4 ${
        isEditing
          ? "border-[#2897A3] ring-4 ring-[#2897A3]/5 shadow-xl scale-[1.01]"
          : "border-stone-100 hover:border-stone-200 shadow-sm"
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Imagen de Previsualización y Carga */}
            <div className="md:col-span-3">
              <label className={labelStyle}>Imagen</label>
              <div className="relative group aspect-video md:aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 shadow-inner">
                {currentImage ? (
                  <img
                    src={currentImage}
                    className={`h-full w-full object-cover transition-all duration-500 ${uploadMutation.isPending ? "scale-110 blur-sm opacity-50" : "opacity-100"}`}
                    alt="Preview"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-stone-50">
                    <PhotoIcon className="h-8 w-8 text-stone-200" />
                  </div>
                )}
                
                {uploadMutation.isPending && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-[#2897A3] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <label className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest">Cambiar</span>
                </label>
              </div>
              <input type="hidden" {...register("image")} />
            </div>

            {/* Datos del Servicio */}
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-4">
                <label className={labelStyle}>Nombre del Servicio</label>
                <input
                  {...register("name", { required: true })}
                  className={inputEditStyle}
                  disabled={isUpdating}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelStyle}>Visible</label>
                <div className="h-[42px] flex items-center justify-center bg-stone-50 rounded-xl border border-stone-100">
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

              <div className="md:col-span-3">
                <label className={labelStyle}>Duración (min)</label>
                <input
                  type="number"
                  {...register("duration", { valueAsNumber: true })}
                  className={inputEditStyle}
                  disabled={isUpdating}
                />
              </div>

              <div className="md:col-span-3">
                <label className={labelStyle}>Precio ($)</label>
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className={inputEditStyle}
                  disabled={isUpdating}
                />
              </div>

              <div className="md:col-span-6">
                <label className={labelStyle}>Descripción</label>
                <textarea
                  {...register("description")}
                  rows={2}
                  className={`${inputEditStyle} resize-none`}
                  disabled={isUpdating}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-50">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-xl text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors flex items-center gap-2"
            >
              <XMarkIcon className="h-4 w-4" /> Cancelar
            </button>
            <button
              type="submit"
              disabled={isUpdating || uploadMutation.isPending}
              className="px-8 py-2.5 rounded-xl bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#2897A3] transition-all shadow-lg shadow-stone-200 flex items-center gap-2 disabled:bg-stone-200"
            >
              {isUpdating ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckIcon className="h-4 w-4" />}
              Guardar Cambios
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5 flex-1 min-w-0">
            <div className="h-14 w-14 rounded-2xl overflow-hidden flex-shrink-0 border border-stone-100 shadow-sm bg-stone-50">
              {item.image ? (
                <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
              ) : (
                <PhotoIcon className="h-full w-full p-3 text-stone-200" />
              )}
            </div>
            <div className="truncate">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B5A447] font-bold block mb-1">
                {item.group}
              </span>
              <h4 className="text-sm font-semibold text-stone-800 truncate">{item.name}</h4>
              <p className="text-[11px] text-stone-400 italic line-clamp-1 mt-0.5">{item.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0">
            <div className="flex gap-8">
              <div className="text-center">
                <p className={labelStyle}>Tiempo</p>
                <p className="text-xs font-bold text-stone-600">{item.duration} min</p>
              </div>
              <div className="text-center">
                <p className={labelStyle}>Inversión</p>
                <p className="text-xs font-bold text-stone-600">${item.price}</p>
              </div>
              <div className="text-center">
                <p className={labelStyle}>Estado</p>
                <div className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${item.enabled ? 'text-[#2897A3] bg-[#2897A3]/5' : 'text-stone-300 bg-stone-50'}`}>
                  {item.enabled ? 'Visible' : 'Oculto'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-6 border-l border-stone-100">
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 rounded-xl bg-stone-50 text-stone-400 hover:text-[#B5A447] hover:bg-[#B5A447]/10 transition-all"
                title="Editar"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => confirm(`¿Eliminar definitivamente "${item.name}"?`) && mutateDelete(item.handle)}
                className="p-3 rounded-xl bg-stone-50 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Eliminar"
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
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@headlessui/react";
import {
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  PhotoIcon
} from "@heroicons/react/20/solid";
import { toast } from "sonner";
import type { Promocion } from "../types";
import { deletePromotion, updatePromotion, upLoadPromotionImage } from "../api/LeCocomApi";

type PromotionInputProps = {
  item: Promocion;
};

export default function PromotionsInput({ item }: PromotionInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, control, setValue, watch } = useForm<Promocion>({
    defaultValues: item,
  });

  const currentImage = watch("image");

  // Mutación para actualizar la promoción
  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updatePromotion,
    onSuccess: () => {
      toast.success("Promoción actualizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
      setIsEditing(false);
    },
    onError: (error) => toast.error(error.message),
  });

  // Mutación para subir la imagen publicitaria
  const uploadMutation = useMutation({
    mutationFn: upLoadPromotionImage,
    onSuccess: (url) => {
      if (url) {
        setValue("image", url); 
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

  // Mutación para eliminar la promoción
  const { mutate: mutateDelete } = useMutation({
    mutationFn: deletePromotion,
    onSuccess: () => {
      toast.success("Promoción eliminada");
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data: Promocion) => mutateUpdate(data);

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const inputEditStyle =
    "w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-2xl text-xs text-stone-700 focus:ring-2 focus:ring-[#2897A3]/20 focus:border-[#2897A3] outline-none transition-all disabled:opacity-50 placeholder:text-stone-300 font-medium";

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            
            {/* Título */}
            <div className="md:col-span-5">
              <label className="text-[9px] uppercase text-stone-600 font-bold ml-1 mb-1.5 block tracking-[0.2em]">
                Título de Promoción
              </label>
              <input
                {...register("title", { required: "Obligatorio" })}
                className={inputEditStyle}
                disabled={isUpdating || uploadMutation.isPending}
              />
            </div>

            {/* Handle (ID) - Solo Lectura */}
            <div className="md:col-span-3">
              <label className="text-[9px] uppercase text-stone-600 font-bold ml-1 mb-1.5 block tracking-[0.2em]">
                Identificador (Slug)
              </label>
              <input
                {...register("handle")}
                readOnly
                className={`${inputEditStyle} font-mono text-[11px] bg-stone-100 cursor-not-allowed opacity-75`}
                title="El identificador único no se puede editar"
              />
            </div>

            {/* Switch de Visibilidad */}
            <div className="md:col-span-4 flex flex-col items-center justify-center bg-stone-50/80 p-3 rounded-2xl border border-stone-200/70">
              <label className="text-[9px] uppercase text-stone-600 font-bold mb-2 tracking-[0.2em]">
                Estado Visible
              </label>
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

            {/* Descripción */}
            <div className="md:col-span-12">
              <label className="text-[9px] uppercase text-stone-600 font-bold ml-1 mb-1.5 block tracking-[0.2em]">
                Descripción Exclusiva
              </label>
              <textarea
                {...register("description")}
                rows={2}
                className={`${inputEditStyle} resize-none leading-relaxed`}
                disabled={isUpdating || uploadMutation.isPending}
              />
            </div>

            {/* Sección de Imagen */}
            <div className="md:col-span-12 border-t border-stone-100 pt-5">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="h-20 w-28 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative shadow-inner flex items-center justify-center">
                  {currentImage ? (
                    <img 
                      src={currentImage} 
                      className={`h-full w-full object-cover transition-opacity ${uploadMutation.isPending ? 'opacity-30' : 'opacity-100'}`} 
                      alt="Preview" 
                    />
                  ) : (
                    <PhotoIcon className="h-8 w-8 text-stone-300" />
                  )}
                  {uploadMutation.isPending && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 w-full">
                  <label className="text-[9px] uppercase text-stone-600 font-bold mb-1.5 block tracking-[0.2em]">
                    Sustituir Imagen Publicitaria
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-xs text-stone-500
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-xl file:border-0
                      file:text-[10px] file:font-bold file:uppercase file:tracking-widest
                      file:bg-stone-900 file:text-white
                      hover:file:bg-[#D4C363] hover:file:text-stone-950 cursor-pointer transition-all"
                  />
                  <input type="hidden" {...register("image")} />
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3 pt-3 border-t border-stone-100">
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
              className="px-6 py-2.5 rounded-xl bg-[#D4C363] text-stone-950 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
            >
              <CheckIcon className="h-4 w-4" />
              {isUpdating ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      ) : (
        /* MODO LECTURA */
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Miniatura actual */}
          <div className="h-20 w-28 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0 shadow-sm">
            <img 
              src={item.image} 
              className="h-full w-full object-cover" 
              alt={item.title} 
              onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1544161515-4508f5ad4c24?q=80&w=1000")}
            />
          </div>

          {/* Información */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2897A3]/10 text-[#2897A3] text-[9px] font-bold tracking-widest uppercase border border-[#2897A3]/20">
                {item.handle}
              </span>
            </div>
            <h4 className="text-base font-serif italic font-normal text-stone-800 leading-tight">
              {item.title}
            </h4>
            <p className="text-xs text-stone-500 line-clamp-1 italic font-light">
              "{item.description || "Sin descripción disponible"}"
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 border-t md:border-t-0 border-stone-100 pt-3 md:pt-0">
            {/* Indicador de Estado */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] uppercase text-stone-400 font-bold tracking-widest">Visibilidad</span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-50 border border-stone-200/60">
                <div className={`h-2 w-2 rounded-full ${item.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${item.enabled ? 'text-stone-700' : 'text-stone-400'}`}>
                  {item.enabled ? 'Activa' : 'Oculta'}
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2 border-l border-stone-100 pl-6">
              <button 
                onClick={() => setIsEditing(true)} 
                className="p-3 rounded-xl bg-stone-50 text-stone-400 hover:text-[#D4C363] hover:bg-stone-900 transition-all duration-300 cursor-pointer shadow-sm"
                title="Editar Promoción"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => confirm(`¿Eliminar permanentemente la promoción "${item.title}"?`) && mutateDelete(item.handle)}
                className="p-3 rounded-xl bg-stone-50 text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300 cursor-pointer shadow-sm"
                title="Eliminar Promoción"
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
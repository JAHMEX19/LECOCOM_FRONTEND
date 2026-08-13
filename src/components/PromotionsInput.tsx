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

  // Observamos el campo "image" para que la preview se actualice al subir nueva imagen
  const currentImage = watch("image");

  // --- Mutación para actualizar los datos de la promoción ---
  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updatePromotion,
    onSuccess: () => {
      toast.success("Promoción actualizada");
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
      setIsEditing(false);
    },
    onError: (error) => toast.error(error.message),
  });

  // --- Mutación para subir la imagen (Igual a FormPromotions) ---
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

  // --- Mutación para eliminar la promoción ---
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
    "w-full bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl text-xs text-stone-600 focus:ring-1 focus:ring-[#2897A3] outline-none transition-all disabled:opacity-50 placeholder:text-stone-300";

  return (
    <div
      className={`bg-white border transition-all duration-300 p-6 rounded-[2rem] shadow-sm mb-4 ${
        isEditing
          ? "border-[#2897A3] ring-1 ring-[#2897A3]/10 shadow-lg"
          : "border-stone-100 hover:border-stone-200"
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Título */}
            <div className="md:col-span-4">
              <label className="text-[8px] uppercase text-stone-400 font-bold ml-1 mb-1 block tracking-wider">Título</label>
              <input
                {...register("title", { required: "Obligatorio" })}
                className={inputEditStyle}
                disabled={isUpdating || uploadMutation.isPending}
              />
            </div>

            {/* Handle (ID) - Solo lectura */}
            <div className="md:col-span-3">
              <label className="text-[8px] uppercase text-stone-400 font-bold ml-1 mb-1 block tracking-wider">Identificador (Slug)</label>
              <input
                {...register("handle")}
                readOnly
                className={`${inputEditStyle} font-mono text-[10px] bg-stone-100 cursor-not-allowed opacity-70`}
                title="El identificador único no se puede editar"
              />
            </div>

            {/* Descripción */}
            <div className="md:col-span-4">
              <label className="text-[8px] uppercase text-stone-400 font-bold ml-1 mb-1 block tracking-wider">Descripción Corta</label>
              <textarea
                {...register("description")}
                rows={1}
                className={`${inputEditStyle} resize-none py-2.5`}
                disabled={isUpdating || uploadMutation.isPending}
              />
            </div>

            {/* Switch de Visibilidad */}
            <div className="md:col-span-1 flex flex-col items-center justify-center bg-stone-50/50 p-1.5 rounded-xl border border-stone-100">
              <label className="text-[7px] uppercase text-stone-400 font-bold mb-1.5">Visible</label>
              <Controller
                name="enabled"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    className={`${field.value ? "bg-[#2897A3]" : "bg-stone-200"} relative inline-flex h-5 w-9 items-center rounded-full transition-colors outline-none`}
                  >
                    <span className={`${field.value ? "translate-x-5" : "translate-x-1"} inline-block h-3 w-3 transform rounded-full bg-white transition-transform`} />
                  </Switch>
                )}
              />
            </div>

            {/* Sección de Imagen */}
            <div className="md:col-span-12 mt-2 border-t border-stone-50 pt-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0 relative group shadow-inner">
                  {currentImage ? (
                    <img 
                      src={currentImage} 
                      className={`h-full w-full object-cover transition-opacity ${uploadMutation.isPending ? 'opacity-30' : 'opacity-100'}`} 
                      alt="Preview" 
                    />
                  ) : (
                    <PhotoIcon className="h-full w-full p-3 text-stone-300" />
                  )}
                  {uploadMutation.isPending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-5 h-5 border-2 border-[#2897A3] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <label className="text-[8px] uppercase text-stone-400 font-bold mb-1 block tracking-wider">Nueva Imagen Publicitaria</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-[9px] text-stone-500
                      file:mr-4 file:py-1.5 file:px-3
                      file:rounded-lg file:border-0
                      file:text-[9px] file:font-bold file:uppercase
                      file:bg-stone-800 file:text-white
                      hover:file:bg-[#2897A3] cursor-pointer transition-all"
                  />
                  <input type="hidden" {...register("image")} />
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-2 pt-3">
            <button 
              type="button" 
              onClick={handleCancel} 
              className="px-4 py-2 rounded-xl bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-stone-200 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" /> Cancelar
            </button>
            <button
              type="submit"
              disabled={isUpdating || uploadMutation.isPending}
              className="px-6 py-2 rounded-xl bg-[#2897A3] text-white text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-[#1e737c] transition-colors shadow-md shadow-[#2897A3]/10"
            >
              <CheckIcon className="h-4 w-4" />
              {isUpdating ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      ) : (
        /* MODO LECTURA */
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           {/* Miniatura actual */}
           <div className="h-16 w-24 rounded-2xl overflow-hidden bg-stone-100 border border-stone-50 flex-shrink-0 shadow-sm">
             <img 
               src={item.image} 
               className="h-full w-full object-cover" 
               alt={item.title} 
               onError={(e) => (e.currentTarget.src = "https://placehold.co/400x300?text=Sin+Imagen")}
             />
           </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-[#2897A3]/10 text-[#2897A3] text-[9px] font-bold tracking-widest uppercase">
                {item.handle}
              </span>
            </div>
            <h4 className="text-sm font-bold text-stone-700 leading-tight">{item.title}</h4>
            <p className="text-xs text-stone-400 mt-1 line-clamp-1 italic font-light">
              {item.description || "Sin descripción"}
            </p>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
             {/* Indicador de Estado Reintegrado */}
             <div className="flex flex-col items-center gap-1">
                <span className="text-[8px] uppercase text-stone-300 font-bold tracking-wider">Estado</span>
                <div className="flex items-center gap-1.5">
                  <div className={`h-1.5 w-1.5 rounded-full ${item.enabled ? 'bg-green-400 animate-pulse' : 'bg-stone-300'}`} />
                  <span className={`text-[10px] font-medium ${item.enabled ? 'text-stone-600' : 'text-stone-400'}`}>
                    {item.enabled ? 'Activa' : 'Oculta'}
                  </span>
                </div>
              </div>

             {/* Acciones */}
             <div className="flex items-center gap-2 border-l border-stone-100 pl-6">
              <button 
                onClick={() => setIsEditing(true)} 
                className="p-2.5 rounded-xl bg-stone-50 text-stone-400 hover:text-[#B5A447] hover:bg-[#B5A447]/5 transition-all"
                title="Editar"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => confirm(`¿Eliminar permanentemente "${item.title}"?`) && mutateDelete(item.handle)}
                className="p-2.5 rounded-xl bg-stone-50 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
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
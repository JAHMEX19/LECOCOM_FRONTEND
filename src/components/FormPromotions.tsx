import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import PromotionsInput from "./PromotionsInput";
import { addPromotion, getPromotions, upLoadPromotionImage } from "../api/LeCocomApi";
import { Navigate } from "react-router-dom";
import LoadingHeader from "./LoadingHeader";
import { PlusIcon } from "@heroicons/react/24/outline"; // Importa iconos para la preview
import type { Promocion } from "../types";

export default function FormPromotions() {
  const queryClient = useQueryClient();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotions,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue, // IMPORTANTE: Para setear la imagen manualmente
    //watch,    // IMPORTANTE: Para ver la imagen en tiempo real
    formState: { errors },
  } = useForm<Promocion>({
    defaultValues: {
      handle: "",
      title: "",
      description: "",
      image: "",
    },
  });

  // Observamos el valor de la imagen para mostrar la preview
  //const imageValue = watch("image");

  const { mutate } = useMutation({
    mutationFn: addPromotion,
    onSuccess: () => {
      toast.success("Promoción agregada correctamente");
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Error al agregar la promoción");
    },
  });

  const uploadMutation = useMutation({
    mutationFn: upLoadPromotionImage,
    onSuccess: (url) => {
      // 1. Guardamos la URL en el campo 'image' del formulario
      if (url) {
        setValue("image", url);
      }
      toast.success("Imagen cargada con éxito");
    },
    onError: (error) => {
      toast.error(error.message || "Error al subir la imagen");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadMutation.mutate(e.target.files[0]);
    }
  };

  const labelStyle = "text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold ml-1";
  const inputStyle = "w-full bg-white border border-stone-100 p-4 rounded-2xl text-xs text-stone-600 focus:ring-1 focus:ring-[#2897A3] outline-none transition-all shadow-sm placeholder:text-stone-300";

  if (isLoading) return <LoadingHeader />;
  if (isError) return <Navigate to="/user/profile" />;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <section className="mb-20">
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B5A447] font-bold mb-6 ml-2">
          Gestión de promociones
        </h3>
        
        <form
          onSubmit={handleSubmit((formData) => mutate(formData))}
          className="bg-white border border-stone-100 p-8 rounded-[3rem] shadow-xl shadow-stone-200/40 transition-all group mb-10"
        >
          <div className="flex flex-col space-y-6">
            {/* INPUTS DE TEXTO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className={labelStyle}>Identificador (Slug)</label>
                <input
                  {...register("handle", { required: "El identificador es obligatorio" })}
                  className={inputStyle}
                  placeholder="ej-promocion-navidad"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className={labelStyle}>Título</label>
                <input
                  {...register("title", { required: "El título es obligatorio" })}
                  className={inputStyle}
                  placeholder="Promoción Diciembre 2024"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className={labelStyle}>Descripción</label>
              <textarea
                {...register("description", { required: "La descripción es obligatoria" })}
                rows={2}
                className={`${inputStyle} resize-none`}
              />
            </div>

            {/* SECCIÓN DE IMAGEN CON PREVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-9 flex flex-col space-y-2">
                <label className={labelStyle}>Imagen Publicitaria</label>
                <div className="flex items-center gap-4">
                  
                  
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-[10px] text-stone-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-[10px] file:font-bold file:uppercase
                      file:bg-[#2897A3]/10 file:text-[#2897A3]
                      hover:file:bg-[#2897A3]/20 cursor-pointer"
                    onChange={handleChange}
                  />
                </div>
                {/* Campo oculto para que react-hook-form valide la imagen */}
                <input type="hidden" {...register("image", { required: "La imagen es obligatoria" })} />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  disabled={uploadMutation.isPending}
                  className={`${
                    uploadMutation.isPending ? 'bg-stone-300' : 'bg-stone-800 hover:bg-[#2897A3]'
                  } text-white h-[56px] w-[56px] rounded-full flex items-center justify-center transition-all duration-500 shadow-lg active:scale-95`}
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* MENSAJES DE ERROR */}
          <div className="mt-4">
             {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
             {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
             {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
             {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
          </div>
        </form>

        {/* LISTADO DE PROMOCIONES */}
        <div className="space-y-4">
          {data?.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-[2.5rem]">
              <p className="text-stone-400 text-xs italic">No hay promociones activas.</p>
            </div>
          ) : (
            data?.map((promocion: Promocion) => (
              <PromotionsInput key={promocion.handle} item={promocion} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
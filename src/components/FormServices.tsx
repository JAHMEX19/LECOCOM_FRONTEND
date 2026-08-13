import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ServiciosInput from "./ServiciosInput";
import { addServicios, getServicios, upLoadServiceImage } from "../api/LeCocomApi";
import { Navigate } from "react-router-dom";
import LoadingHeader from "./LoadingHeader";
import { PlusIcon, PhotoIcon } from "@heroicons/react/24/outline";
import type { Servicio } from "../types";

export default function FormServices() {
  const queryClient = useQueryClient();
  const [filtroCategoria, setFiltroCategoria] = useState("todos");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["servicios"],
    queryFn: getServicios,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Servicio>({
    defaultValues: {
      name: "",
      group: "terapéuticos",
      duration: 0,
      price: 0,
      handle: "",
      description: "",
      image: ""
    },
  });

  // Monitoreamos el campo de imagen para mostrar feedback visual
  const currentImageUrl = watch("image");

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: addServicios,
    onSuccess: () => {
      toast.success("Servicio creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["servicios"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Error al crear el servicio");
    },
  });

  const uploadMutation = useMutation({
    mutationFn: upLoadServiceImage,
    onSuccess: (url) => {
      if (url) {
        setValue("image", url);
      }
      toast.success("Imagen procesada correctamente");
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

  if (isLoading) return <LoadingHeader />;
  if (isError) return <Navigate to="/user/profile" />;

  const categoriasUnicas = ["todos", ...new Set(data?.map((s) => s.group) || [])];
  const serviciosFiltrados =
    filtroCategoria === "todos"
      ? data
      : data?.filter((s) => s.group === filtroCategoria);

  // Estilos reutilizables
  const labelStyle = "text-[11px] uppercase tracking-[0.3em] text-stone-500 font-bold ml-1";
  const inputStyle = "w-full bg-white border border-stone-100 p-4 rounded-2xl text-sm text-stone-600 focus:ring-1 focus:ring-[#2897A3] outline-none transition-all shadow-sm placeholder:text-stone-300";

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      <section>
        <header className="mb-10 ml-2">
          <h3 className="text-[12px] uppercase tracking-[0.5em] text-[#B5A447] font-bold">
            Administración
          </h3>
          <h2 className="text-3xl font-light text-stone-800 tracking-tight">Gestión de Catálogo</h2>
        </header>

        <form
          onSubmit={handleSubmit((formData) => mutate(formData))}
          className="bg-white border border-stone-100 p-10 rounded-[3.5rem] shadow-2xl shadow-stone-200/40 transition-all"
        >
          <div className="flex flex-col space-y-8">
            
            {/* BLOQUE 1: Datos Principales e Imagen */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 space-y-6">
                <div className="flex flex-col space-y-2">
                  <label className={labelStyle}>Nombre del Servicio</label>
                  <input
                    {...register("name", { required: "El nombre es obligatorio" })}
                    className={inputStyle}
                    placeholder="Ej. Ritual de Cacao y Piedras Volcánicas"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className={labelStyle}>Categoría del Tratamiento</label>
                  <select
                    {...register("group")}
                    className={`${inputStyle} appearance-none bg-stone-50/30 cursor-pointer`}
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
              </div>

              {/* Input de Imagen Estilizado como Dropzone */}
              <div className="md:col-span-5 flex flex-col space-y-2">
                <label className={labelStyle}>Imagen Publicitaria</label>
                <div className="relative h-full">
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    className="hidden"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`h-full min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed rounded-[2rem] transition-all cursor-pointer group/upload
                      ${currentImageUrl 
                        ? 'border-[#2897A3] bg-[#2897A3]/5' 
                        : 'border-stone-100 bg-stone-50/50 hover:border-[#B5A447] hover:bg-white'}
                    `}
                  >
                    {uploadMutation.isPending ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#2897A3] border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] uppercase tracking-widest text-[#2897A3] font-bold">Subiendo...</span>
                      </div>
                    ) : currentImageUrl ? (
                      <div className="flex flex-col items-center gap-2 text-[#2897A3]">
                        <PhotoIcon className="h-6 w-6" />
                        <span className="text-[9px] uppercase tracking-widest font-bold">¡Imagen Lista!</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-stone-400 group-hover/upload:text-[#B5A447]">
                        <PlusIcon className="h-6 w-6" />
                        <span className="text-[9px] uppercase tracking-widest font-bold">Cargar Foto</span>
                      </div>
                    )}
                  </label>
                  <input type="hidden" {...register("image", { required: "La imagen es obligatoria" })} />
                </div>
              </div>
            </div>

            {/* BLOQUE 2: Detalles Técnicos y Descripción */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-2 flex flex-col space-y-2">
                <label className={labelStyle}>Duración</label>
                <div className="relative">
                  <input
                    type="number"
                    {...register("duration")}
                    className={`${inputStyle} text-center pr-8`}
                    placeholder="60"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-bold">MIN</span>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col space-y-2">
                <label className={labelStyle}>Inversión</label>
                <div className="relative">
                  <input
                    type="number"
                    {...register("price")}
                    className={`${inputStyle} text-center pl-8`}
                    placeholder="0"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-bold">$</span>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col space-y-2">
                <label className={labelStyle}>Descripción del Tratamiento</label>
                <textarea
                  {...register("description", { required: "La descripción es obligatoria" })}
                  rows={2}
                  className={`${inputStyle} resize-none py-4 leading-relaxed`}
                  placeholder="Describe la experiencia y beneficios..."
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={uploadMutation.isPending || isCreating}
                  className="w-full bg-stone-900 hover:bg-[#2897A3] disabled:bg-stone-200 text-white py-4 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl hover:shadow-[#2897A3]/30 active:scale-95"
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Errores */}
          {(errors.name || errors.description || errors.image) && (
            <div className="mt-8 pt-6 border-t border-stone-50 space-y-2">
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
              {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>
          )}
        </form>
      </section>

      {/* SECCIÓN DE FILTROS Y LISTADO */}
      <section className="space-y-12 bg-stone-50/50 p-10 rounded-[3.5rem] border border-stone-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-[11px] uppercase tracking-[0.4em] text-stone-400 font-bold">
              Explorar Catálogo
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-light text-stone-800 italic font-serif">Existencias</span>
              <span className="bg-white px-3 py-1 rounded-full border border-stone-100 text-[10px] font-bold text-[#2897A3] shadow-sm">
                {serviciosFiltrados?.length} SERVICIOS
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {categoriasUnicas.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border ${
                  filtroCategoria === cat
                    ? "bg-[#2897A3] border-[#2897A3] text-white shadow-lg shadow-[#2897A3]/20"
                    : "bg-white border-stone-200 text-stone-400 hover:border-[#B5A447] hover:text-[#B5A447]"
                }`}
              >
                {cat === "todos" ? "Ver Todo" : cat}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {serviciosFiltrados?.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm">
              <p className="text-stone-400 text-sm italic font-light">
                No se encontraron servicios en esta categoría.
              </p>
            </div>
          ) : (
            serviciosFiltrados?.map((servicio: Servicio) => (
              <ServiciosInput key={servicio.handle} item={servicio} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
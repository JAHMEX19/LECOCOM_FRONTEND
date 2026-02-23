import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ServiciosInput from "./ServiciosInput";
import { addServicios, getServicios } from "../api/LeCocomApi";
import { Navigate } from "react-router-dom";
import LoadingHeader from "./LoadingHeader";
import { PlusIcon } from "@heroicons/react/16/solid";
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
    formState: { errors },
  } = useForm<Servicio>({
    defaultValues: {
      name: "",
      group: "masajes",
      duration: 0,
      price: 0,
      handle: "",
      description: "",
    },
  });

  const { mutate } = useMutation({
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

  if (isLoading) return <LoadingHeader />;
  if (isError) return <Navigate to="/user/profile" />;

  const categoriasUnicas = ["todos", ...new Set(data?.map((s) => s.group) || [])];
  const serviciosFiltrados =
    filtroCategoria === "todos"
      ? data
      : data?.filter((s) => s.group === filtroCategoria);

  const labelStyle = "text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold ml-1";
  const inputStyle = "w-full bg-white border border-stone-100 p-4 rounded-2xl text-xs text-stone-600 focus:ring-1 focus:ring-[#2897A3] outline-none transition-all shadow-sm placeholder:text-stone-300";

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <section className="mb-20">
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#B5A447] font-bold mb-6 ml-2">
          Gestión de Catálogo
        </h3>

        <form
          onSubmit={handleSubmit((formData) => mutate(formData))}
          className="bg-white border border-stone-100 p-8 rounded-[3rem] shadow-xl shadow-stone-200/40 transition-all group"
        >
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-4">
            Nuevo servicio
          </h3>
          
          <div className="flex flex-col space-y-6">
            {/* PRIMERA LÍNEA: Nombre y Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6 flex flex-col space-y-2">
                <label className={labelStyle}>Nombre del Servicio</label>
                <input
                  {...register("name", { required: "El nombre es obligatorio" })}
                  className={inputStyle}
                  placeholder="Ej. Masaje Sueco"
                />
              </div>
              <div className="md:col-span-6 flex flex-col space-y-2">
                <label className={labelStyle}>Categoría</label>
                <select
                  {...register("group")}
                  className={`${inputStyle} appearance-none bg-stone-50/50 cursor-pointer`}
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

            {/* SEGUNDA LÍNEA: Minutos, Precio y DESCRIPCIÓN (Textarea) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 flex gap-4">
                <div className="flex flex-col space-y-2 flex-1">
                  <label className={labelStyle}>Minutos</label>
                  <input
                    type="number"
                    {...register("duration")}
                    className={`${inputStyle} text-center px-0`}
                    placeholder="60"
                  />
                </div>
                <div className="flex flex-col space-y-2 flex-1">
                  <label className={labelStyle}>Precio</label>
                  <input
                    type="number"
                    {...register("price")}
                    className={`${inputStyle} text-center px-0`}
                    placeholder="$"
                  />
                </div>
              </div>

              {/* CAMBIO AQUÍ: Uso de Textarea para la descripción */}
              <div className="md:col-span-8 flex flex-col space-y-2">
                <label className={labelStyle}>Descripción del Tratamiento</label>
                <textarea
                  {...register("description", { required: "La descripción es obligatoria" })}
                  rows={2}
                  className={`${inputStyle} resize-none py-3`}
                  placeholder="Describe los beneficios y técnica del servicio..."
                />
              </div>

              {/* Botón de acción centrado verticalmente con el textarea */}
              <div className="md:col-span-1 flex items-center justify-center pt-6 md:pt-8">
                <button
                  type="submit"
                  className="bg-stone-800 hover:bg-[#2897A3] text-white h-[48px] w-[48px] rounded-full flex items-center justify-center transition-all duration-500 shadow-md hover:shadow-[#2897A3]/40 active:scale-90"
                  title="Agregar Servicio"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {(errors.name || errors.description) && (
            <div className="mt-4 flex flex-col gap-1">
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>
          )}
        </form>
      </section>

      {/* --- SECCIÓN DE FILTROS Y LISTADO (Sin cambios) --- */}
      <section className="space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-4">
              Filtrar por categoría
            </h3>
            <nav className="flex flex-wrap justify-center gap-3">
              {categoriasUnicas.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className={`px-5 py-2 rounded-full text-[9px] uppercase tracking-widest transition-all duration-300 border ${
                    filtroCategoria === cat
                      ? "bg-[#2897A3] border-[#2897A3] text-white shadow-md shadow-[#2897A3]/20"
                      : "bg-white border-stone-200 text-stone-400 hover:border-[#B5A447]/50 hover:text-[#B5A447]"
                  }`}
                >
                  {cat === "todos" ? "Ver Todo" : cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="w-full flex items-center gap-4">
            <div className="h-[1px] bg-stone-100 flex-1"></div>
            <span className="text-[9px] text-stone-300 uppercase tracking-[0.2em] font-medium">
              {serviciosFiltrados?.length} resultados
            </span>
            <div className="h-[1px] bg-stone-100 flex-1"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {serviciosFiltrados?.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-[2.5rem]">
              <p className="text-stone-400 text-xs italic">
                No hay servicios en esta categoría.
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
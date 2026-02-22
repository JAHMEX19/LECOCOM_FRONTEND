import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { User, UserProfileFormData } from "../types";
import { updateProfile, upLoadImage } from "../api/LeCocomApi";
import { toast } from "sonner";

export default function FormProfileView() {
  
  //1. Obtener los datos del usuario desde el cache de React Query
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  //2. Configurar React Hook Form con los datos del usuario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    defaultValues: {
      name: data.name,
      descripcion: data.descripcion,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: upLoadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          image: data
        };
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: UserProfileFormData) => {
    console.log(formData);
    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm shadow-stone-200/50 border border-stone-100/50 space-y-8"
        onSubmit={handleSubmit(handleUserProfileForm)}
      >
        {/* TÍTULO DE LA SECCIÓN */}
        <legend className="text-2xl font-light tracking-[0.2em] text-stone-700 uppercase text-center mb-4">
          Editar{" "}
          <span className="font-semibold text-[#2897A3]">Información</span>
        </legend>

        <p className="text-stone-400 text-[10px] text-center uppercase tracking-[0.3em] -mt-4 mb-10">
          Personaliza tu presencia en el Wellness Hub
        </p>

        {/* CAMPO: HANDLE */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1"
          >
            Nombre de Usuario
          </label>
          <input
            id="name"
            type="text"
            className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl placeholder-stone-300 text-stone-600 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all duration-300"
            placeholder="@usuario"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* CAMPO: DESCRIPCIÓN */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1"
          >
            Descripción Biográfica
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl placeholder-stone-300 text-stone-600 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all duration-300 resize-none"
            placeholder="Cuéntanos un poco sobre ti..."
            {...register("descripcion")}
          />
          {errors.descripcion && (
            <ErrorMessage>{errors.descripcion.message}</ErrorMessage>
          )}
        </div>

        {/* CAMPO: IMAGEN (ESTILIZADO) */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="image"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1"
          >
            Imagen de Perfil
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="block w-full text-xs text-stone-500
                            file:mr-4 file:py-3 file:px-6
                            file:rounded-full file:border-0
                            file:text-[10px] file:font-bold file:uppercase file:tracking-widest
                            file:bg-[#2897A3]/10 file:text-[#2897A3]
                            hover:file:bg-[#2897A3]/20 transition-all cursor-pointer"
            onChange={handleChange}
          />
        </div>

        {/* BOTÓN SUBMIT */}
        <div className="pt-6">
          <input
            type="submit"
            className="w-full bg-[#B5A447] hover:bg-[#2897A3] text-white p-4 rounded-2xl text-[11px] uppercase tracking-[0.25em] font-bold cursor-pointer transition-all duration-500 shadow-lg shadow-[#B5A447]/20"
            value="Guardar Cambios"
          />
        </div>
      </form>
    </div>
  );
}

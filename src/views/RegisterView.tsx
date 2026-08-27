import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterFormData } from "../types/index.ts";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function RegisterView() {
  const initalValues: RegisterFormData = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
    admin: false,
  };

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ defaultValues: initalValues });

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      const { data } = await api.post(`/user/register`, formData);
      toast.success(data.message || "Usuario registrado exitosamente");
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Encabezado de la Sección */}
      <header className="text-center mb-8 space-y-2">
        <h1 className="text-3xl font-light tracking-[0.2em] text-stone-700 uppercase">
          Crear <span className="font-serif italic text-[#2897A3] font-normal">Usuario</span>
        </h1>
        <p className="text-stone-400 text-xs tracking-widest uppercase">
          Gestión interna de accesos • Le Cocom Spa
        </p>
      </header>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-200/60 space-y-6"
        noValidate
      >
        {/* Campo: Nombre */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold ml-1"
          >
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ej. Ana García"
            className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl placeholder-stone-400 text-stone-700 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Campo: Email */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="email"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold ml-1"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@ejemplo.com"
            className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl placeholder-stone-400 text-stone-700 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Campo: Handle */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="handle"
            className="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold ml-1"
          >
            Tag de usuario (Handle)
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Ej. anagarcia (sin espacios)"
            className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl placeholder-stone-400 text-stone-700 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
            {...register("handle", {
              required: "El tag de usuario es obligatorio",
            })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
        </div>

        {/* Campo: Password y Confirmación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold ml-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl placeholder-stone-400 text-stone-700 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
              {...register("password", {
                required: "El password es obligatorio",
                minLength: {
                  value: 6,
                  message: "Password debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password_confirmation"
              className="text-[10px] uppercase tracking-[0.2em] text-stone-600 font-bold ml-1"
            >
              Confirmar
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              className="w-full bg-stone-50 border border-stone-200 p-4 rounded-xl placeholder-stone-400 text-stone-700 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
              {...register("password_confirmation", {
                required: "Confirmar es obligatorio",
                validate: (value) =>
                  value === getValues("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>
        </div>

        {/* CAMPO: ROL ADMINISTRADOR (CHECKBOX/SWITCH) */}
        <div className="pt-2">
          <label className="relative flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-white transition-colors">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-800 font-bold">
                Rol de Administrador
              </span>
              <span className="text-[10px] text-stone-400 tracking-wider">
                Otorga permisos para gestionar servicios, promociones y usuarios.
              </span>
            </div>
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#2897A3] rounded border-stone-300 focus:ring-[#2897A3] cursor-pointer"
              {...register("admin")}
            />
          </label>
        </div>

        {/* Botón Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#D4C363] hover:bg-stone-900 text-stone-950 hover:text-white p-4.5 rounded-2xl text-xs uppercase tracking-[0.25em] font-bold cursor-pointer transition-all duration-500 shadow-xl shadow-[#D4C363]/20 active:scale-[0.98]"
          >
            Crear Nuevo Usuario
          </button>
        </div>
      </form>
    </div>
  );
}
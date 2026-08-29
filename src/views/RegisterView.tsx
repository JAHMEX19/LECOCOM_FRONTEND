import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { UserPlusIcon, ShieldCheckIcon, SparklesIcon } from "@heroicons/react/24/outline";
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
    superAdmin: false,
  };

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const labelStyle = "text-[9px] uppercase tracking-[0.2em] text-stone-600 font-bold ml-1 mb-1.5 block";
  const inputStyle = "w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-2xl text-xs text-stone-700 focus:ring-2 focus:ring-[#2897A3]/20 focus:border-[#2897A3] outline-none transition-all placeholder:text-stone-300 font-medium";

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      {/* Encabezado */}
      <header className="text-center space-y-3">
        <div className="inline-block px-5 py-2 border border-stone-200/80 bg-white/60 backdrop-blur-md rounded-full shadow-sm">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4C363] font-bold">
            Gestión de Usuarios
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-stone-800 uppercase">
          Crear <span className="font-serif italic text-[#2897A3] font-normal">Cuenta</span>
        </h1>
        <p className="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium">
          Acceso interno y credenciales • Le Cocom Spa
        </p>
      </header>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl shadow-stone-200/40 border border-stone-200/70 space-y-5"
        noValidate
      >
        {/* Campo: Nombre */}
        <div>
          <label htmlFor="name" className={labelStyle}>
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ej. Ana García"
            className={inputStyle}
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Campo: Email y Handle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelStyle}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="email@ejemplo.com"
              className={inputStyle}
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

          <div>
            <label htmlFor="handle" className={labelStyle}>
              Tag de usuario (Handle)
            </label>
            <input
              id="handle"
              type="text"
              placeholder="anagarcia"
              className={inputStyle}
              {...register("handle", {
                required: "El tag de usuario es obligatorio",
              })}
            />
            {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
          </div>
        </div>

        {/* Campo: Password y Confirmación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className={labelStyle}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={inputStyle}
              {...register("password", {
                required: "El password es obligatorio",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>

          <div>
            <label htmlFor="password_confirmation" className={labelStyle}>
              Confirmar Contraseña
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              className={inputStyle}
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

        {/* ROLES EN GRID PARALELA COMPACTA */}
        <div className="pt-2 space-y-1.5">
          <span className={labelStyle}>Permisos de Acceso</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Admin */}
            <label className="flex items-center justify-between p-3.5 bg-stone-50/80 border border-stone-200/80 rounded-2xl cursor-pointer hover:bg-stone-100/70 transition-colors">
              <div className="flex items-center gap-2.5">
                <ShieldCheckIcon className="h-4 w-4 text-[#2897A3] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-stone-800 font-bold leading-tight">
                    Admin
                  </span>
                  <span className="text-[9px] text-stone-400 font-medium">
                    Servicios y promos
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#2897A3] rounded border-stone-300 cursor-pointer"
                {...register("admin")}
              />
            </label>

            {/* Super Admin */}
            <label className="flex items-center justify-between p-3.5 bg-stone-50/80 border border-stone-200/80 rounded-2xl cursor-pointer hover:bg-stone-100/70 transition-colors">
              <div className="flex items-center gap-2.5">
                <SparklesIcon className="h-4 w-4 text-[#D4C363] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-stone-800 font-bold leading-tight">
                    Super Admin
                  </span>
                  <span className="text-[9px] text-stone-400 font-medium">
                    Acceso total
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#D4C363] rounded border-stone-300 cursor-pointer"
                {...register("superAdmin")}
              />
            </label>

          </div>
        </div>

        {/* Botón Submit */}
        <div className="pt-4 border-t border-stone-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-stone-900 text-white text-xs tracking-[0.25em] font-bold uppercase rounded-2xl hover:bg-[#D4C363] hover:text-stone-950 transition-all duration-500 shadow-xl active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer group disabled:bg-stone-300"
          >
            <UserPlusIcon className="h-4 w-4 text-white group-hover:text-stone-950 transition-colors" />
            <span>{isSubmitting ? "Registrando..." : "Crear Nuevo Usuario"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
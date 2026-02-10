import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterFormData } from "../types/index.ts";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function RegisterView() {
  const initalValues = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
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
      toast.success(data.message);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto">
        {/* Encabezado de la Sección */}
        <header className="text-center mb-10">
          <h1 className="text-3xl font-light tracking-[0.2em] text-stone-700 uppercase">
            Crear <span className="font-semibold text-[#2897A3]">Cuenta</span>
          </h1>
          <p className="text-stone-400 text-xs mt-2 tracking-widest uppercase">
            Únete a la experiencia Le Cocom
          </p>
        </header>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 space-y-6"
        >
          {/* Campo: Nombre */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1"
            >
              Nombre Completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ej. Ana García"
              className="w-full bg-stone-50 border border-stone-100 p-4 rounded-xl placeholder-stone-300 text-stone-600 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message} </ErrorMessage>}
          </div>

          {/* Campo: Email */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="email@ejemplo.com"
              className="w-full bg-stone-50 border border-stone-100 p-4 rounded-xl placeholder-stone-300 text-stone-600 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message} </ErrorMessage>
            )}
          </div>

          {/* Campo: Handle */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="handle"
              className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1"
            >
              Tag de usuario
            </label>
            <input
              id="handle"
              type="text"
              placeholder="Nombre de usuario: sin espacios"
              className="w-full bg-stone-50 border border-stone-100 p-4 rounded-xl placeholder-stone-300 text-stone-600 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
              {...register("handle", {
                required: "El tag de usuario es obligatorio",
              })}
            />
            {errors.handle && (
              <ErrorMessage>{errors.handle.message} </ErrorMessage>
            )}
          </div>

          {/* Campo: Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="password"
                className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-100 p-4 rounded-xl placeholder-stone-300 text-stone-600 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
                {...register("password", {
                  required: "El password es obligatorio",
                  minLength: {
                    value: 6,
                    message: "Password debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message} </ErrorMessage>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="password_confirmation"
                className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1"
              >
                Confirmar
              </label>
              <input
                id="password_confirmation"
                type="password"
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-100 p-4 rounded-xl placeholder-stone-300 text-stone-600 focus:outline-none focus:border-[#2897A3] focus:ring-1 focus:ring-[#2897A3] transition-all"
                {...register("password_confirmation", {
                  required: "Confirmar es obligatorio",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Las contraseñas no coinciden",
                })}
              />
              {errors.password_confirmation && (
                <ErrorMessage>
                  {errors.password_confirmation.message}{" "}
                </ErrorMessage>
              )}
            </div>
          </div>

          {/* Botón Submit */}
          <div className="pt-4">
            <input
              type="submit"
              className="w-full bg-[#B5A447] hover:bg-[#2897A3] text-white p-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold cursor-pointer transition-all duration-500 shadow-lg shadow-[#B5A447]/20"
              value="Registrarme Ahora"
            />
          </div>
        </form>

        {/* Navegación Inferior */}
        <nav className="mt-8 text-center">
          <Link
            to="/user/login"
            className="text-stone-400 text-[11px] uppercase tracking-widest hover:text-[#2897A3] transition-colors"
          >
            ¿Ya tienes cuenta?{" "}
            <span className="font-bold border-b border-stone-200">
              Inicia Sesión
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginFormData } from "../types/index";
import api from "../config/axios";

export default function LoginView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initalValues: LoginFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initalValues });

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const { data } = await api.post(`/user/login`, formData);
      localStorage.setItem("AUTH_TOKEN", data);
      
      // Invalida la cache para que React Query refresque el usuario en los Layouts
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      toast.success("Inicio de sesión exitoso");
      navigate("/auth/profile", { replace: true });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center py-10 px-4 relative bg-[#FCFAF8]">
      
      {/* BOTÓN VOLVER */}
      <div className="w-full max-w-lg mb-6 flex justify-start">
        <Link 
          to="/" 
          className="text-stone-400 text-xs uppercase tracking-[0.3em] hover:text-[#2897A3] transition-colors flex items-center gap-2 font-bold"
        >
          <span>←</span> Inicio
        </Link>
      </div>

      <div className="w-full max-w-lg mx-auto">
        
        {/* ENCABEZADO */}
        <header className="text-center mb-10 space-y-3">
          <div className="inline-block px-6 py-2 border border-stone-200 bg-white/60 backdrop-blur-md rounded-full shadow-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4C363] font-bold">
              Portal de Acceso
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.2em] text-stone-800 uppercase">
            Iniciar <span className="font-serif italic text-[#2897A3] font-normal">Sesión</span>
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm tracking-[0.25em] uppercase font-medium">
            Bienvenidos a la experiencia Le Cocom
          </p>
        </header>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white p-8 sm:p-12 md:p-14 rounded-[3rem] shadow-xl border border-stone-200/60 space-y-6"
          noValidate
        >
          {/* Campo: Email */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-[0.2em] text-stone-600 font-bold ml-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="w-full bg-stone-50 border border-stone-200 p-4 sm:p-5 rounded-2xl placeholder-stone-400 text-stone-700 text-base focus:outline-none focus:ring-2 focus:ring-[#2897A3]/20 focus:border-[#2897A3] transition-all"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          {/* Campo: Password */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-[0.2em] text-stone-600 font-bold ml-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-stone-50 border border-stone-200 p-4 sm:p-5 rounded-2xl placeholder-stone-400 text-stone-700 text-base focus:outline-none focus:ring-2 focus:ring-[#2897A3]/20 focus:border-[#2897A3] transition-all"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          {/* Botón de Acción */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#D4C363] hover:bg-stone-900 text-stone-950 hover:text-white p-5 rounded-2xl text-xs sm:text-sm uppercase tracking-[0.25em] font-bold cursor-pointer transition-all duration-500 shadow-xl shadow-[#D4C363]/20 active:scale-[0.97]"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
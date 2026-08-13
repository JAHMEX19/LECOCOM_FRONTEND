import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginFormData } from "../types/index";
import api from "../config/axios";

export default function LoginView() {
  const navigate = useNavigate();

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
      toast.success("Inicio de sesión exitoso");
      navigate("/auth/profile", { replace: true });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-[65vh] flex flex-col justify-center items-center py-10 relative">
      
      {/* BOTÓN VOLVER: Conservando tu estilo de Link original */}
      <div className="w-full max-w-lg mb-6 flex justify-start">
        <Link 
          to="/" 
          className="text-stone-400 text-xs uppercase tracking-[0.3em] hover:text-[#2897A3] transition-colors flex items-center gap-2"
        >
          <span>←</span> Inicio
        </Link>
      </div>

      <div className="w-full max-w-lg mx-auto">
        
        {/* Encabezado: Títulos originales */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-[0.2em] text-stone-700 uppercase">
            Iniciar <span className="font-semibold text-[#2897A3]">Sesión</span>
          </h1>
          <p className="text-stone-500 text-sm mt-3 tracking-[0.3em] uppercase font-medium">
            Bienvenidos a la experiencia Le Cocom
          </p>
        </header>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-stone-200/70 border border-stone-100 space-y-8"
          noValidate
        >
          {/* Campo: Email */}
          <div className="flex flex-col space-y-3">
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
              className="w-full bg-stone-50 border border-stone-200 p-5 rounded-2xl placeholder-stone-400 text-stone-700 text-base focus:outline-none focus:ring-2 focus:ring-[#2897A3]/20 focus:border-[#2897A3] transition-all"
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
          <div className="flex flex-col space-y-3">
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
              className="w-full bg-stone-50 border border-stone-200 p-5 rounded-2xl placeholder-stone-400 text-stone-700 text-base focus:outline-none focus:ring-2 focus:ring-[#2897A3]/20 focus:border-[#2897A3] transition-all"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          {/* Botón de Acción original */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-[#B5A447] hover:bg-[#2897A3] text-white p-5 rounded-2xl text-sm uppercase tracking-[0.2em] font-black cursor-pointer transition-all duration-500 shadow-xl shadow-[#B5A447]/20 active:scale-[0.97]"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        {/* Navegación Inferior original */}
        <nav className="mt-12 text-center">
          <Link
            to="/user/register"
            className="group text-stone-500 text-xs uppercase tracking-[0.3em] hover:text-[#2897A3] transition-colors"
          >
            ¿Aún no tienes cuenta?{" "}
            <span className="font-black text-stone-700 group-hover:text-[#2897A3] border-b-2 border-stone-200 transition-all ml-1">
              Crear cuenta
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
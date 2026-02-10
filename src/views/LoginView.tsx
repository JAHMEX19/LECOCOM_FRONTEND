import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginFormData } from "../types/index";
import api from "../config/axios";

export default function LoginView() {
  
  const initalValues : LoginFormData = {
    email: "",
    password: "",
  };


  const {register,handleSubmit, formState: { errors },} = useForm({ defaultValues: initalValues });

  const handleLogin = async(formData : LoginFormData) => {
    // Lógica de inicio de sesión aquí
     try {
      const {data} = await api.post(`/user/login`, formData);
      localStorage.setItem('AUTH_TOKEN', data);
      toast.success("Inicio de sesión exitoso");
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
            Iniciar <span className="font-semibold text-[#2897A3]">Sesión</span>
          </h1>
          <p className="text-stone-400 text-xs mt-2 tracking-widest uppercase">
            Bienvenidos a la experiencia Le Cocom
          </p>
        </header>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 space-y-6"
        >
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
                required: "El Email es obligatorio",
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

          {/* Campo: Password */}

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
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message} </ErrorMessage>
            )}
          </div>

          {/* Botón Submit */}
          <div className="pt-4">
            <input
              type="submit"
              className="w-full bg-[#B5A447] hover:bg-[#2897A3] text-white p-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold cursor-pointer transition-all duration-500 shadow-lg shadow-[#B5A447]/20"
              value="Iniciar sesión"
            />
          </div>
        </form>

        {/* Navegación Inferior */}
        <nav className="mt-8 text-center">
          <Link
            to="/user/register"
            className="text-stone-400 text-[11px] uppercase tracking-widest hover:text-[#2897A3] transition-colors"
          >
            ¿Aún no tienes cuenta?{" "}
            <span className="font-bold border-b border-stone-200">
              Crear cuenta
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
}

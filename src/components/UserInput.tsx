import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@headlessui/react";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { toast } from "sonner";
import type { User } from "../types";
import { updateUserRoles } from "../api/LeCocomApi";

type UserInputProps = {
  item: User;
};

export default function UserInput({ item }: UserInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { handleSubmit, reset, control, setValue} = useForm<User>({
    defaultValues: item,
  });

 

  // Mutación para actualizar roles
  const { mutate: mutateRoles, isPending: isUpdating } = useMutation({
    mutationFn: updateUserRoles,
    onSuccess: () => {
      toast.success(`Roles de ${item.name} actualizados correctamente`);
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      setIsEditing(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al actualizar los roles");
    },
  });

  const onSubmit = (data: User) => {
    // Garantizar la jerarquía antes de enviar
    const isSuper = data.superAdmin ?? false;
    const isAdmin = isSuper ? true : (data.admin ?? false);

    mutateRoles({
      id: item._id,
      admin: isAdmin,
      superAdmin: isSuper,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <div
      className={`bg-white border transition-all duration-300 p-6 sm:p-7 rounded-[2.5rem] shadow-sm mb-5 ${
        isEditing
          ? "border-[#2897A3] ring-4 ring-[#2897A3]/10 shadow-xl"
          : "border-stone-200/70 hover:border-stone-300 hover:shadow-md"
      }`}
    >
      {isEditing ? (
        /* MODO EDICIÓN DE ROLES CON REGLA DE JERARQUÍA */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Info de Usuario */}
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 border-2 border-white shadow-md">
                <span className="text-xl font-serif italic text-[#D4C363]">
                  {item.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-800">{item.name}</h4>
                <p className="text-xs text-stone-400 font-medium">{item.email}</p>
                <span className="text-[10px] text-[#2897A3] font-bold uppercase tracking-wider">
                  @{item.handle}
                </span>
              </div>
            </div>

            {/* Switches de Roles Interconectados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 max-w-md">
              
              {/* Switch Admin */}
              <div className="flex items-center justify-between bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200/70">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4 text-[#2897A3]" />
                  <span className="text-[10px] uppercase tracking-wider text-stone-700 font-bold">
                    Admin
                  </span>
                </div>
                <Controller
                  name="admin"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onChange={(val: boolean) => {
                        field.onChange(val);
                        // Si se desmarca Admin, desmarcar SuperAdmin obligatoriamente
                        if (!val) {
                          setValue("superAdmin", false);
                        }
                      }}
                      className={`${field.value ? "bg-[#2897A3]" : "bg-stone-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none cursor-pointer`}
                    >
                      <span className={`${field.value ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md`} />
                    </Switch>
                  )}
                />
              </div>

              {/* Switch Super Admin */}
              <div className="flex items-center justify-between bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200/70">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-[#D4C363]" />
                  <span className="text-[10px] uppercase tracking-wider text-stone-700 font-bold">
                    Super Admin
                  </span>
                </div>
                <Controller
                  name="superAdmin"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onChange={(val: boolean) => {
                        field.onChange(val);
                        // Si se activa SuperAdmin, activar Admin obligatoriamente
                        if (val) {
                          setValue("admin", true);
                        }
                      }}
                      className={`${field.value ? "bg-[#D4C363]" : "bg-stone-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none cursor-pointer`}
                    >
                      <span className={`${field.value ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md`} />
                    </Switch>
                  )}
                />
              </div>

            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4" /> Cancelar
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2.5 rounded-xl bg-[#D4C363] text-stone-950 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-md active:scale-95 cursor-pointer disabled:bg-stone-200"
            >
              {isUpdating ? (
                <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckIcon className="h-4 w-4" />
              )}
              Guardar Permisos
            </button>
          </div>
        </form>
      ) : (
        /* MODO LECTURA */
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 border border-stone-700 shadow-sm">
              <span className="text-xl font-serif italic text-[#D4C363]">
                {item.name.charAt(0)}
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-stone-800">{item.name}</h4>
                <span className="text-[9px] font-bold text-[#2897A3] uppercase tracking-widest bg-[#2897A3]/10 px-2 py-0.5 rounded-full">
                  @{item.handle}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium">{item.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 ${
                  item.admin
                    ? "bg-[#2897A3]/10 text-[#2897A3] border-[#2897A3]/20"
                    : "bg-stone-50 text-stone-300 border-stone-200/50"
                }`}
              >
                <ShieldCheckIcon className="h-3 w-3" />
                {item.admin ? "Admin Activo" : "No Admin"}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 ${
                  item.superAdmin
                    ? "bg-[#D4C363]/15 text-stone-900 border-[#D4C363]/40"
                    : "bg-stone-50 text-stone-300 border-stone-200/50"
                }`}
              >
                <SparklesIcon className="h-3 w-3 text-[#D4C363]" />
                {item.superAdmin ? "SuperAdmin" : "Standard"}
              </span>
            </div>

            <div className="pl-4 border-l border-stone-100">
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 rounded-xl bg-stone-50 text-stone-400 hover:text-[#D4C363] hover:bg-stone-900 transition-all duration-300 cursor-pointer shadow-sm"
                title="Gestionar Permisos"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
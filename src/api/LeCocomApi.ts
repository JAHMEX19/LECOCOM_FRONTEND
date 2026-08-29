import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User, UserProfileFormData, Servicio , Promocion } from "../types";

export async function getUser() {
  try {
    const { data } = await api.get<{ user: User }>(`/user/profile`);

    return data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateProfile(formData: UserProfileFormData) {
  try {
    const { data } = await api.patch<string>(`/user/profile`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function upLoadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const {
      data: { image },
    }: { data: { image: string } } = await api.post(
      "/user/profile/image",
      formData,
    );
    return image;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getServicios() {
  try {
    const { data } = await api.get<Servicio[]>("/user/admin/servicios");
    console.log("Desde la API", data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getServiciosClients() {
  try {
    const { data } = await api.get<Servicio[]>("/servicios");
    console.log("Desde la API", data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addServicios (servicio: Servicio) {
  try {
    const { data } = await api.post("/user/admin/servicios", servicio);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }

}

export async function updateServicio (servicio: Servicio) {
  try {
    const { data } = await api.put(`/user/admin/servicios/${servicio.handle}`, servicio);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteServicio(handle: string) {
  try {
    const { data } = await api.delete(`/user/admin/servicios/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function upLoadServiceImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await api.post("/user/admin/servicios/image", formData);
    
    // IMPORTANTE: Asegúrate de que el nombre coincida con lo que envía tu backend
    // Si tu backend envía { imageUrl: "..." }, usa data.imageUrl
    return data.imageUrl || data.image; 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al subir la imagen");
    }
    throw new Error("Error de red al subir la imagen");
  }
}

export async function getPromotions() {
  try {
    const { data } = await api.get<Promocion[]>("/promociones");
    //console.log("Desde la API", data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addPromotion(promotion: Promocion) {
  try {
    const { data } = await api.post("/user/admin/promociones", promotion);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updatePromotion(promotion:Promocion) {
  try {
    const { data } = await api.put(`/user/admin/promociones/${promotion.handle}`, promotion);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deletePromotion(handle: string) {
  try {
    const { data } = await api.delete(`/user/admin/promociones/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
  
export async function upLoadPromotionImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await api.post("/user/admin/promociones/image", formData);
    
    // IMPORTANTE: Asegúrate de que el nombre coincida con lo que envía tu backend
    // Si tu backend envía { imageUrl: "..." }, usa data.imageUrl
    return data.imageUrl || data.image; 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al subir la imagen");
    }
    throw new Error("Error de red al subir la imagen");
  }
}

export async function getPromotionsClients() {
  try {
    const { data } = await api.get<Promocion[]>("/promociones");
    console.log("Desde la API", data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
// --- GESTIÓN DE USUARIOS (SUPER ADMIN) ---

export async function getAllUsers() {
  try {
    const { data } = await api.get<User[]>("/user/all-users");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener la lista de usuarios");
  }
}

export async function updateUserRoles({
  id,
  admin,
  superAdmin,
}: {
  id: string;
  admin: boolean;
  superAdmin: boolean;
}) {
  try {
    const { data } = await api.patch<{ message: string }>(`/user/${id}/roles`, {
      admin,
      superAdmin,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al actualizar los roles del usuario");
  }
}
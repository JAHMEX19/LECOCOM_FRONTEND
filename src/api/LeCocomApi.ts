import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User, UserProfileFormData } from "../types";

export async function getUser() {
  try {
      const { data } = await api.get<{user:User}>(`/user/profile`)
      
      return data.user
  } catch (error) {
      if (isAxiosError(error) && error.response) {
       throw new Error(error.response.data.error);
      }
  }
}

export async function updateProfile(formData:UserProfileFormData) {
  try {
      const { data } = await api.patch<string>(`/user/profile`,formData)
      
      return data
  } catch (error) {
      if (isAxiosError(error) && error.response) {
       throw new Error(error.response.data.error);
      }
  }
}

export async function upLoadImage(file : File) {
    const formData = new FormData();
    formData.append("file", file);
    
    try {
        const {data :{image}} :{data:{image:string}} = await api.post("/user/profile/image", formData)
        return image

    } catch (error) {
        if (isAxiosError(error) && error.response) {
       throw new Error(error.response.data.error);
      }
        
    }
}
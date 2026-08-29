export type User = {
    handle:string;
    name:string;
    email:string;
    password:string;
    token:string;
    confirm?:boolean;
    admin?: boolean;
    superAdmin?: boolean;
    _id:string;
    descripcion?:string;
    image?:string;
}

export type RegisterFormData = Pick<User, 'handle' | 'name' | 'email' | 'admin' | 'superAdmin' > & {
    password:string,
    password_confirmation:string,
}

export type LoginFormData = Pick<User, 'email'> & {
    password:string
}

export type UserProfileFormData = Pick<User, 'name' | 'descripcion'|'handle' | 'image'>;


export type ServiciosDataBase = {
    handle:string;
    name:string;
    group:string;
    duration:number;
    price:number;
    image:string;
    enabled:boolean;
    description?:string;

}

export type PromocionesDataBase = {
    handle:string;
    title:string;
    description:string; 
    image:string;
    enabled:boolean;
}

export type Servicio = Pick<ServiciosDataBase, 'handle' | 'name' | 'group' | 'duration' | 'price' | 'enabled' | 'description' | 'image'>; 

export type Promocion = Pick<PromocionesDataBase, 'handle' | 'title' | 'description' | 'image'| 'enabled'>;
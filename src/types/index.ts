export type User = {
    handle:string;
    name:string;
    email:string;
    password:string;
    token:string;
    confirm?:boolean;
    admin?:boolean;
    _id:string;
    descripcion?:string;
    image?:string;
}

export type RegisterFormData = Pick<User, 'handle' | 'name' | 'email' > & {
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
    enabled:boolean;
    description?:string;

}

export type Servicio = Pick<ServiciosDataBase, 'handle' | 'name' | 'group' | 'duration' | 'price' | 'enabled' | 'description'>; 
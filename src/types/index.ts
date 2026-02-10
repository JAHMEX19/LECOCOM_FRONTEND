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
    id:number,
    nombre:string;
    grupo:string;
    duracion:number;
    enabled:boolean;
}

export type Tratamiento = Pick<ServiciosDataBase, 'nombre' | 'grupo' | 'duracion' | 'enabled'> 
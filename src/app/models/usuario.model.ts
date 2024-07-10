export interface Usuario {
  id?: number;
  name: string;
  username: string;
  password: string;

}

export interface Usuarios extends Array<Usuario> { }

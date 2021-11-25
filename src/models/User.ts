export interface User {
  id?: string;
  email: string;
  roles: Role;
  oilp:number;
  pointp:number;
  doublep:number;
}

export interface Role {
  admin: boolean;
}
export interface Price{
  id?:string;
  oilp:number;
  pointp:number;
  doublep:number;
  curUsr:string;

}

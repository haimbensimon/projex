

export interface Medic {
  id?: string;
  custId: string;
  firstName: string;
  curUser: string;
  lastName: string;
  painList: [];
  goodList: [];
  oilArr: [];
  painPointList:[];
  pointsFA: [];
  head: [];
  neck: [];
  arms: [];
  body: [];
  back: [];
  legs: [];
  sexs: [];
  intr: [];
  sprt: [];
  glbl: [];
  totalPrice?:number;
  theDate:Date;
}

export interface Items {
  name: string;
};

export interface Park {
  items: Items[];
  equipment: string;
  area: string;
  age: string;
  material: string;
  painting: string;
  value: number;
  valueInstall: number;
  observations: string;
}

export interface ParkValue {
  parks: Park[];
  totalParks: string;
  cep: string;
  user: string;
  delivery: string;
  payment: string;
};
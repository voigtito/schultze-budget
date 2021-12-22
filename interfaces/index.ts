export interface Items {
  name: string;
};

export interface Park {
  items: Items[];
  name: string;
  equipment: string;
  area: string;
  age: string;
  material: string;
  painting: string;
  value: string | number;
  valueInstall: string | number;
  observations: string;
}

export interface ParkValue {
  parks: Park[];
  totalParks: number;
  cep: string;
  user: string;
  deadline: string;
  payment: string;
  totalValue: number;
};
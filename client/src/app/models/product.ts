interface Rate {
 rate:number;
 count:number
}
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating:Rate
}

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity?: number;
}

export interface User {
  email: string;
  role: "admin" | "user";
}

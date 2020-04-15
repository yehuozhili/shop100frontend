import { Product } from "./home";
export interface CartItem {
	product: Product;
	count: number;
	checked: boolean;
	key: string;
}

export type CartState = Array<CartItem>;

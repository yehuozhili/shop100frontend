import { Product } from "./home";
export interface ProductDetail {
	sliderpic: Array<string>;
	footerpic: Array<string>;
	texty: string;
	userId: string;
	id: string;
}
export interface ProductDetailState {
	data: ProductDetail;
	product: Product;
	detailLoading: boolean;
	detailfavourite: boolean;
	favouriteLoading: boolean;
}

export interface ProductDetailData {
	success: boolean;
	data: ProductDetail;
	checked: boolean;
}
export interface ProductOneDetail {
	success: boolean;
	data: Product;
}
export interface ProductFavourite {
	success: boolean;
	data: boolean;
}

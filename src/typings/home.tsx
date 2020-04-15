export interface HomeState {
	currentCategory: string;
	sliders: Slider[];
	renderProduct: RenderProduct;
}
export interface Slider {
	id: string;
	url: string;
}
export interface SliderData {
	success: boolean;
	data: Slider[];
}
export interface Product {
	id: string;
	order: number;
	title: string;
	poster: string;
	url: string;
	price: number;
	category: string;
}
export interface ProductData {
	success: boolean;
	data: {
		product: Product[];
		more: boolean;
	};
}
export interface RenderProduct {
	loading: boolean;
	productList: Product[];
	more: boolean;
	offset: number;
	limit: number;
}

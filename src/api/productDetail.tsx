import request from "./index";
import { ProductDetailData, ProductOneDetail, ProductFavourite } from "@/typings";

export function APIgetProductDetails<T>(value: string) {
	return request.get<T, ProductDetailData>(`/products/detail/${value}`);
}
export function APIgetOneProduct<T>(value: string) {
	return request.get<T, ProductOneDetail>(`/products/${value}`);
}
export function APIaddFavourite<T>(value: string) {
	return request.post<T, ProductFavourite>(`/productsfavourite/`, { id: value });
}

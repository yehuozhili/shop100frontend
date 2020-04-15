import request from "./index";
import { SearchData, SearchName, SearchArray } from "@/typings";
export function APIsearchProduct<T>(value: string) {
	return request.get<T, SearchData>(`/product/search?query=${value}`);
}
export function APIgetAllName<T>() {
	return request.get<T, SearchName>(`/product/getallname`);
}
export function APIproductStringArray<T>(value: SearchArray) {
	return request.post<T, SearchData>(`/product/searcharray`, value);
}

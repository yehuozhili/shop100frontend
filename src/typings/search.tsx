import { Product } from "./home";

export interface SearchState {
	searchList: Product[];
	productFullName: Array<string>;
}
export interface SearchData {
	success: boolean;
	data: Product[];
}
export interface SearchName {
	success: boolean;
	data: Array<string>;
}
export interface SearchArray {
	lis: Array<string>;
}

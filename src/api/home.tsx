import request from "./index";
import { SliderData, ProductData } from "@/typings";

export function APIgetSlider<T>() {
	return request.get<T, SliderData>("/slider/list");
}
export function APIgetProduct<T>(currentCategory = "all", offset: number, limit: number) {
	return request.get<T, ProductData>(
		`products/list?currentCategory=${currentCategory}&offset=${offset}&limit=${limit}`
	);
}

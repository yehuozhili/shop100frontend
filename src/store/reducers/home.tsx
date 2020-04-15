import { AnyAction } from "redux";
import { HomeState } from "@/typings/";
import * as actionTypes from "@/store/action-types";
const initialState: HomeState = {
	currentCategory: "all",
	sliders: [],
	renderProduct: {
		loading: false,
		productList: [],
		more: true,
		offset: 0,
		limit: 6,
	},
};
export default function (state: HomeState = initialState, action: AnyAction): HomeState {
	switch (action.type) {
		case actionTypes.SET_CURRENT_CATEGORY:
			state.currentCategory = action.payload;
			return state;
		case actionTypes.GET_SLIDERS:
			if (action.payload.data) state.sliders = action.payload.data;
			return state;
		case actionTypes.SET_PRODUCT:
			state.renderProduct.productList = [
				...state.renderProduct.productList,
				...action.payload.product,
			];
			state.renderProduct.more = action.payload.more;
			state.renderProduct.offset = state.renderProduct.offset + action.payload.product.length;
			return state;
		case actionTypes.SET_PRODUCT_LOADING:
			state.renderProduct.loading = action.payload;
			return state;
		case actionTypes.REFRESH_PRODUCT:
			state.renderProduct.productList = [...action.payload.product];
			state.renderProduct.more = action.payload.more;
			state.renderProduct.offset = action.payload.product.length;
			return state;
		default:
			return state;
	}
}

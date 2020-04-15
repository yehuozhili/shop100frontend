import { AnyAction } from "redux";
import { ProductDetailState } from "@/typings/";
import * as actionTypes from "@/store/action-types";
const initialState: ProductDetailState = {
	data: {
		sliderpic: [],
		footerpic: [],
		texty: "",
		userId: "",
		id: "",
	},
	product: {
		id: "",
		order: 0,
		title: "",
		poster: "",
		url: "",
		price: 0,
		category: "",
	},
	detailLoading: false,
	detailfavourite: false,
	favouriteLoading: false,
};
export default function (
	state: ProductDetailState = initialState,
	action: AnyAction
): ProductDetailState {
	switch (action.type) {
		case actionTypes.GET_PRODUCT_DETAIL:
			state.data = action.payload.data;
			state.detailfavourite = action.payload.checked;
			return state;
		case actionTypes.GET_ONE_PRODUCT:
			state.product = action.payload.data;
			return state;

		case actionTypes.DETAIL_LOADING:
			state.detailLoading = action.payload;
			return state;
		case actionTypes.ADD_USER_FAVOURITE:
			state.detailfavourite = action.payload;
			return state;

		case actionTypes.FAVOURITE_LOADING:
			state.favouriteLoading = action.payload;
			return state;
		default:
			return state;
	}
}

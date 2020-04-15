import { AnyAction } from "redux";
import { SearchState } from "@/typings/";

import * as actionTypes from "@/store/action-types";

const initialState: SearchState = {
	searchList: [],
	productFullName: [],
};
export default function (state: SearchState = initialState, action: AnyAction): SearchState {
	switch (action.type) {
		case actionTypes.SEARCH_PRODUCT: {
			state.searchList = action.payload;
			return state;
		}
		case actionTypes.GET_FULL_PRODUCTNAME: {
			state.productFullName = action.payload;
			return state;
		}
		default: {
			return state;
		}
	}
}

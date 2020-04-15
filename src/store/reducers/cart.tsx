import { AnyAction } from "redux";
import { CartState, CartItem } from "@/typings/";
import * as actionTypes from "../action-types";
const initialState: CartState = [];
export default function (state: CartState = initialState, action: AnyAction): CartState {
	switch (action.type) {
		case actionTypes.ADD_CART_ITEM: {
			//product
			const old = state.find((item) => item.product.id === action.payload.id);
			if (old) {
				old.count += 1;
			} else {
				state.push({
					product: action.payload,
					count: 1,
					checked: false,
					key: action.payload.id,
				});
			}
			return state;
		}
		case actionTypes.REMOVE_CART_ITEM: {
			//id
			const oldIndex = state.findIndex((item) => item.product.id === action.payload);
			if (oldIndex != -1) {
				state.splice(oldIndex, 1);
			}
			return state;
		}
		case actionTypes.CHANGE_CART_ITEM_COUNT: {
			//id count
			const changeIndex = state.findIndex((item) => item.product.id === action.payload.id);
			if (changeIndex != -1) {
				state[changeIndex].count = action.payload.count;
			}
			return state;
		}
		case actionTypes.CHANGE_CHECKED_CART_ITEM: {
			//[]
			const checkeds = action.payload;
			state.map((item: CartItem) => {
				if (checkeds.includes(item.product.id)) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			});
			return state;
		}
		case actionTypes.SETTLE:
			return state.filter((item: CartItem) => !item.checked);
		case actionTypes.CLEAR_CART_ITEM:
			return [];
		default:
			return state;
	}
}

import * as actionTypes from "../action-types";
import { Product } from "@/typings";
import { message } from "antd";

const CartDispatchAction = {
	addCartItem(product: Product) {
		return {
			type: actionTypes.ADD_CART_ITEM,
			payload: product,
		};
	},
	changeCartItem(id: string, value: number) {
		return {
			type: actionTypes.CHANGE_CART_ITEM_COUNT,
			payload: { id, count: value },
		};
	},
	removeCartItem(id: string) {
		return {
			type: actionTypes.REMOVE_CART_ITEM,
			payload: id,
		};
	},
	changeChecked(ids: string[]) {
		return {
			type: actionTypes.CHANGE_CHECKED_CART_ITEM,
			payload: ids,
		};
	},
	clearCartItem() {
		return {
			type: actionTypes.CLEAR_CART_ITEM,
			payload: null,
		};
	},
	settle() {
		message.info("请自行接入支付接口");
		return {
			type: actionTypes.SETTLE,
			payload: null,
		};
	},
};

type mapToDispatchPropsFunction<T> = {
	[K in keyof T]: (...args: any) => void | { type: string; payload: any };
};
type mapDispatchToProps = mapToDispatchPropsFunction<typeof CartDispatchAction>;

export default CartDispatchAction;
export { mapDispatchToProps };

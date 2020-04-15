import * as actionType from "../action-types";
import { APIgetSlider, APIgetProduct } from "@/api/home";
import { Dispatch } from "redux";
import { CombinedState, ProductData } from "@/typings";
import { message } from "antd";

const homeDispatchAction = {
	setCurrentCategory(curentCategory: string) {
		return {
			type: actionType.SET_CURRENT_CATEGORY,
			payload: curentCategory,
		};
	},
	getSliders() {
		return {
			type: actionType.GET_SLIDERS,
			payload: APIgetSlider(),
		};
	},
	getProducts() {
		return function (dispatch: Dispatch, getState: () => CombinedState) {
			(async function () {
				const {
					currentCategory,
					renderProduct: { more, limit, offset, loading },
				} = getState().home;
				if (!loading && more) {
					dispatch({
						type: actionType.SET_PRODUCT_LOADING,
						payload: true,
					});
					try {
						const res: ProductData = await APIgetProduct(
							currentCategory,
							offset,
							limit
						);
						if (res.success) {
							dispatch({
								type: actionType.SET_PRODUCT,
								payload: res.data,
							});
						}
						dispatch({
							type: actionType.SET_PRODUCT_LOADING,
							payload: false,
						});
					} catch (e) {
						message.error(e);

						dispatch({
							type: actionType.SET_PRODUCT_LOADING,
							payload: false,
						});
					}
				}
			})();
		};
	},
	refreshProduct() {
		return function (dispatch: Dispatch, getState: () => CombinedState) {
			(async function () {
				const {
					currentCategory,
					renderProduct: { limit, loading },
				} = getState().home;
				if (!loading) {
					dispatch({
						type: actionType.SET_PRODUCT_LOADING,
						payload: true,
					});
					try {
						const res: ProductData = await APIgetProduct(currentCategory, 0, limit);
						if (res.success) {
							dispatch({
								type: actionType.REFRESH_PRODUCT,
								payload: res.data,
							});
						}
						dispatch({
							type: actionType.SET_PRODUCT_LOADING,
							payload: false,
						});
					} catch (e) {
						message.error("后端接口调用失败");
						dispatch({
							type: actionType.SET_PRODUCT_LOADING,
							payload: false,
						});
					}
				}
			})();
		};
	},
};

type mapToDispatchPropsFunction<T> = {
	[K in keyof T]: (...args: any) => void | { type: string; payload: any };
};
type mapDispatchToProps = mapToDispatchPropsFunction<typeof homeDispatchAction>;

export default homeDispatchAction;
export { mapDispatchToProps };

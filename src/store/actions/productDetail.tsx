import * as actionType from "../action-types";
import { Dispatch } from "redux";
import { ProductDetailData, ProductOneDetail, ProductFavourite } from "@/typings";
import { APIgetProductDetails, APIgetOneProduct, APIaddFavourite } from "@/api/productDetail";
import { message } from "antd";

const ProductDetailDispatchAction = {
	getProductsDetails(value: string) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					dispatch({
						type: actionType.DETAIL_LOADING,
						payload: true,
					});
					const res: ProductDetailData = await APIgetProductDetails(value);
					if (res.success) {
						dispatch({
							type: actionType.GET_PRODUCT_DETAIL,
							payload: res,
						});
					} else {
						throw new Error("id错误");
					}
					const res2: ProductOneDetail = await APIgetOneProduct(value);
					if (res.success) {
						dispatch({
							type: actionType.GET_ONE_PRODUCT,
							payload: res2,
						});
					} else {
						throw new Error("id错误");
					}
					dispatch({
						type: actionType.DETAIL_LOADING,
						payload: false,
					});
				} catch (error) {
					message.error("获取错误");
					dispatch({
						type: actionType.DETAIL_LOADING,
						payload: false,
					});
				}
			})();
		};
	},
	addUserFavourite(value: string) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					dispatch({
						type: actionType.FAVOURITE_LOADING,
						payload: true,
					});
					const res: ProductFavourite = await APIaddFavourite(value);
					if (res.success) {
						res.data ? message.info("已收藏") : message.info("取消收藏");
						dispatch({
							type: actionType.ADD_USER_FAVOURITE,
							payload: res.data,
						});
					} else {
						message.error("请登录后收藏");
						dispatch({
							type: actionType.ADD_USER_FAVOURITE,
							payload: false,
						});
					}
					dispatch({
						type: actionType.FAVOURITE_LOADING,
						payload: false,
					});
				} catch (e) {
					message.error("服务器获取失败");
					dispatch({
						type: actionType.FAVOURITE_LOADING,
						payload: false,
					});
				}
			})();
		};
	},
};

type mapToDispatchPropsFunction<T> = {
	[K in keyof T]: (...args: any) => void | { type: string; payload: any };
};
type mapDispatchToProps = mapToDispatchPropsFunction<typeof ProductDetailDispatchAction>;

export default ProductDetailDispatchAction;
export { mapDispatchToProps };

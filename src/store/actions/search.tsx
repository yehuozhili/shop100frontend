import * as actionTypes from "../action-types";
import { Dispatch } from "redux";
import { message } from "antd";
import { APIsearchProduct, APIgetAllName, APIproductStringArray } from "@/api/search";
import { SearchData, SearchName } from "@/typings";

const searchDispatchAction = {
	searchProduct(value: string | Array<string>) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					let res: SearchData;
					if (value instanceof Array) {
						res = await APIproductStringArray({ lis: value });
					} else {
						res = await APIsearchProduct(value);
					}
					if (res.success) {
						dispatch({
							type: actionTypes.SEARCH_PRODUCT,
							payload: res.data,
						});
					} else {
						message.error("搜索接口查询失败");
					}
				} catch (e) {
					message.error("搜索接口查询失败");
				}
			})();
		};
	},
	getFullName() {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					const res: SearchName = await APIgetAllName();
					if (res.success) {
						dispatch({
							type: actionTypes.GET_FULL_PRODUCTNAME,
							payload: res.data,
						});
					} else {
						message.error("自动补全查询失败");
					}
				} catch (e) {
					message.error("自动补全调用错误");
				}
			})();
		};
	},
};

type mapToDispatchPropsFunction<T> = {
	[K in keyof T]: (...args: any) => void | { type: string; payload: any };
};
type mapDispatchToProps = mapToDispatchPropsFunction<typeof searchDispatchAction>;
export { mapDispatchToProps };

export default searchDispatchAction;

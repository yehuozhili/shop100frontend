import {
	APIvalidate,
	APIregister,
	APIlogin,
	APIeditAvatar,
	APIgetCollectDetail,
	APIgetHistoryDetail,
	APIuserAddAdress,
	APIuserDelAdress,
	APIchangeUserAvatar,
	APIchangeUserName,
} from "@/api/profile";
import * as actionTypes from "../action-types";
import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { message } from "antd";
import {
	ResponseData,
	RegisterForm,
	LoginForm,
	EditForm,
	UserCollectData,
	UserHistoryData,
	UserReceive,
} from "@/typings/profile";
import { APIaddFavourite } from "@/api/productDetail";
import { ProductFavourite } from "@/typings";

const profileDispatchAction = {
	validate() {
		return {
			type: actionTypes.VALIDATE,
			payload: APIvalidate(),
		};
	},
	logout() {
		return (dispatch: Dispatch) => {
			sessionStorage.removeItem("access_token");
			dispatch({ type: actionTypes.VALIDATE, payload: APIvalidate() });
			dispatch(push("/login"));
		};
	},
	register(value: RegisterForm) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					const res: ResponseData = await APIregister<RegisterForm>(value);
					if (res.success) {
						message.success("注册成功");
						dispatch(push("/login"));
					} else {
						message.error("注册失败");
					}
				} catch (error) {
					message.error(
						`注册失败\n${error.response.data.data ? error.response.data.data : error}`
					);
				}
			})();
		};
	},

	login(value: LoginForm) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					const res: ResponseData = await APIlogin<LoginForm>(value);
					if (res.success) {
						sessionStorage.setItem("access_token", res.data);
						const valires = await APIvalidate();
						dispatch({
							type: actionTypes.VALIDATE,
							payload: valires,
						});
						dispatch(push("/profile"));
					}
				} catch (error) {
					message.error("登录失败");
				}
			})();
		};
	},
	editAvatar(value: EditForm) {
		return () => {
			(async function () {
				try {
					const res: ResponseData = await APIeditAvatar<EditForm>(value);
					if (res.success) {
						message.success("修改成功");
					}
				} catch (error) {
					message.error("提交失败");
				}
			})();
		};
	},
	getCollectDetail() {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					const res: UserCollectData = await APIgetCollectDetail();
					if (res.success) {
						dispatch({
							type: actionTypes.GET_RENDER_FAVOURITE,
							payload: res.data,
						});
					}
				} catch (error) {
					message.error("获取列表失败");
				}
			})();
		};
	},
	getHistoryDetail() {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					const res: UserHistoryData = await APIgetHistoryDetail();
					if (res.success) {
						dispatch({
							type: actionTypes.GET_RENDER_HISTORY,
							payload: res.data,
						});
					}
				} catch (error) {
					message.error("获取列表失败");
				}
			})();
		};
	},
	profileChangeFavourite(index: number, id: string) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					dispatch({
						type: actionTypes.PROFILE_FAV_LOADING,
						payload: true,
					});
					const res: ProductFavourite = await APIaddFavourite(id);
					if (res.success) {
						res.data ? message.info("已收藏") : message.info("取消收藏");
						dispatch({
							type: actionTypes.PROFILE_FAV_CHANGE,
							payload: { index, data: res.data },
						});
					} else {
						message.error("请登录后收藏");
						dispatch({
							type: actionTypes.PROFILE_FAV_CHANGE,
							payload: { index, data: null },
						});
					}
					dispatch({
						type: actionTypes.PROFILE_FAV_LOADING,
						payload: false,
					});
				} catch (e) {
					message.error("服务器获取失败");
					dispatch({
						type: actionTypes.PROFILE_FAV_LOADING,
						payload: false,
					});
				}
			})();
		};
	},
	profileAddAdress(value: UserReceive) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					const res = await APIuserAddAdress(value);
					if (res.success) {
						dispatch({
							type: actionTypes.ADD_USER_ADDRESS,
							payload: res.data,
						});
						dispatch(push("/profilereceive"));
					} else {
						message.error("添加失败，检查登录状态");
					}
				} catch (e) {
					message.error("服务器获取失败");
				}
			})();
		};
	},
	profileUpdateAdress(value: UserReceive[], arr: Array<boolean>) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					dispatch({
						type: actionTypes.CHANGE_CHECKED_LOADING,
						payload: true,
					});
					let res;
					if (arr) {
						const sendData = JSON.parse(JSON.stringify(value)).map(
							(item: UserReceive, index: number) => {
								item.checked = arr[index];
								return item;
							},
							[]
						);
						res = await APIuserDelAdress(sendData);
					} else {
						res = await APIuserDelAdress(value);
					}

					if (res.success) {
						dispatch({
							type: actionTypes.UPDATE_USER_ADDRESS,
							payload: res.data,
						});
						dispatch({
							type: actionTypes.CHANGE_CHECKED_LOADING,
							payload: false,
						});
					} else {
						message.error("删除失败，检查登录状态");
						dispatch({
							type: actionTypes.CHANGE_CHECKED_LOADING,
							payload: false,
						});
					}
				} catch (e) {
					message.error("服务器获取失败");
					dispatch({
						type: actionTypes.CHANGE_CHECKED_LOADING,
						payload: false,
					});
				}
			})();
		};
	},
	changeAvatar(value: FormData) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					const res = await APIchangeUserAvatar(value);
					if (res.success) {
						dispatch({
							type: actionTypes.CHANGE_USER_AVATAR,
							payload: res.data,
						});
						message.success("修改成功");
					} else {
						message.error("修改失败");
					}
				} catch (e) {
					message.error("修改失败");
				}
			})();
		};
	},
	changeUserName(value: string) {
		return (dispatch: Dispatch) => {
			(async function () {
				try {
					const res = await APIchangeUserName(value);
					if (res.success) {
						dispatch({
							type: actionTypes.CHANGE_USERNAME,
							payload: res.data,
						});
						message.success("修改成功");
					} else {
						message.error("修改失败");
					}
				} catch (e) {
					message.error("修改失败");
				}
			})();
		};
	},
};
type mapToDispatchPropsFunction<T> = {
	[K in keyof T]: (...args: any) => void | { type: string; payload: any };
};
type mapDispatchToProps = mapToDispatchPropsFunction<typeof profileDispatchAction>;

export default profileDispatchAction;
export { mapDispatchToProps };

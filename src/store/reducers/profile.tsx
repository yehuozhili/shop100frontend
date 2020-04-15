import { AnyAction } from "redux";
import { ProfileState, LOGIN_TYPE } from "@/typings/";
import * as actionTypes from "../action-types";
const initialState: ProfileState = {
	loginState: LOGIN_TYPE.UN_VALIDATE,
	user: null,
	error: null,
	renderCollect: [],
	renderHistory: [],
	favLoading: false,
	favChange: { index: 0, data: null },
	checkedLoading: false,
};
export default function (state: ProfileState = initialState, action: AnyAction): ProfileState {
	switch (action.type) {
		case actionTypes.VALIDATE:
			if (action.payload.success) {
				state.loginState = LOGIN_TYPE.LOGINED;
				state.user = action.payload.data;
				state.error = null;
				return state;
			} else {
				state.loginState = LOGIN_TYPE.UNLOGINED;
				state.user = null;
				state.error = action.payload;
				return state;
			}
		case actionTypes.LOGOUT:
			state.loginState = LOGIN_TYPE.UNLOGINED;
			state.user = null;
			state.error = null;
			return state;
		case actionTypes.GET_RENDER_FAVOURITE: {
			state.renderCollect = action.payload;
			return state;
		}
		case actionTypes.GET_RENDER_HISTORY: {
			state.renderHistory = action.payload;
			return state;
		}
		case actionTypes.PROFILE_FAV_LOADING: {
			state.favLoading = action.payload;
			return state;
		}
		case actionTypes.PROFILE_FAV_CHANGE: {
			state.favChange = action.payload;
			return state;
		}
		case actionTypes.ADD_USER_ADDRESS: {
			if (state.user) state.user.receive = action.payload;
			return state;
		}
		case actionTypes.UPDATE_USER_ADDRESS: {
			if (state.user) state.user.receive = action.payload;
			return state;
		}
		case actionTypes.CHANGE_CHECKED_LOADING: {
			state.checkedLoading = action.payload;
			return state;
		}
		case actionTypes.CHANGE_USERNAME: {
			if (state.user) state.user.username = action.payload;
			return state;
		}
		case actionTypes.CHANGE_USER_AVATAR: {
			if (state.user) state.user.avatar = action.payload;
			return state;
		}
		default:
			return state;
	}
}

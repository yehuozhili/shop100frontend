import home from "./home";
import search from "./search";
import profile from "./profile";
import { Reducer, AnyAction } from "redux";
import { connectRouter } from "connected-react-router";
import history from "@/history";
import { CombinedState } from "@/typings/state";
import produce from "immer";
import { combineReducers } from "redux-immer";
import productDetail from "./productDetail";
import cart from "./cart";

const reducers = {
	home,
	search,
	profile,
	productDetail,
	cart,
	router: connectRouter(history),
};
const rootReducer: Reducer<CombinedState, AnyAction> = combineReducers<CombinedState>(
	produce,
	reducers
);
export default rootReducer;

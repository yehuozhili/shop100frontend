import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { routerMiddleware } from "connected-react-router";
import history from "@/history";
import rootReducer from "./reducers";
const store = applyMiddleware(routerMiddleware(history), thunk, promise)(createStore)(rootReducer);
export default store;

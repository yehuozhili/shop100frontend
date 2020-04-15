import { RouterState } from "connected-react-router";
import { HomeState } from "./home";
import { SearchState } from "./search";
import { ProfileState } from "./profile";
import { ProductDetailState } from "./productdetail";
import { CartState } from "./cart";

export interface CombinedState {
	home: HomeState;
	search: SearchState;
	profile: ProfileState;
	router: RouterState;
	productDetail: ProductDetailState;
	cart: CartState;
}

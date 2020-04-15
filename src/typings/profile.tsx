import { Product } from "./home";
export interface RegisterForm {
	username: string;
	password: string;
	email: string;
	confirmpassword: string;
}
export interface ResponseData {
	data: string;
	success: boolean;
	errors?: string;
}
export interface LoginForm {
	email: string;
	password: string;
}
export interface EditForm {
	username: string;
	avatar: string;
}
export interface ProfileState {
	loginState: LOGIN_TYPE;
	user: User | null;
	error: string | null;
	renderCollect: Product[];
	renderHistory: UserHistory[];
	favLoading: boolean;
	favChange: { index: number; data: boolean | null };
	checkedLoading: boolean;
}
export enum LOGIN_TYPE {
	UN_VALIDATE = "UN_VALIDATE",
	LOGINED = "LOGINED",
	UNLOGINED = "UNLOGINED",
}
interface User {
	username: string;
	email: string;
	avatar: string;
	id: string;
	history: UserHistory[];
	favorite: Array<string>;
	receive: UserReceive[];
}
export interface UserHistory {
	id: Product;
	date: string;
}
export interface UserHistoryData {
	success: boolean;
	data: UserHistory[];
}
export interface UserCollectData {
	success: boolean;
	data: Product[];
}

export interface UserReceive {
	name: string;
	phoneNumber: string;
	distinct: string;
	distinctDetail: string;
	checked: boolean;
}
export interface UserReceiveData {
	success: boolean;
	data: UserReceive[];
}

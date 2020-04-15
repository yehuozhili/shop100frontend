import request from "./index";
import {
	RegisterForm,
	ResponseData,
	LoginForm,
	EditForm,
	UserCollectData,
	UserHistoryData,
	UserReceive,
	UserReceiveData,
} from "@/typings/profile";

export function APIvalidate() {
	return request.get("/user/validate");
}
export function APIregister<T>(value: RegisterForm) {
	return request.post<T, ResponseData>("/user/register", value);
}
export function APIlogin<T>(value: LoginForm) {
	return request.post<T, ResponseData>("/user/login", value);
}
export function APIeditAvatar<T>(value: EditForm) {
	return request.post<T, ResponseData>("/user/avatarsubmit", value);
}

export function APIgetCollectDetail<T>() {
	return request.get<T, UserCollectData>("/user/getcollectdetail");
}
export function APIgetHistoryDetail<T>() {
	return request.get<T, UserHistoryData>("/user/gethistorydetail");
}
export function APIuserAddAdress<T>(value: UserReceive) {
	return request.post<T, UserReceiveData>("/useraddadress", value);
}
export function APIuserDelAdress<T>(value: UserReceive[]) {
	return request.post<T, UserReceiveData>("/userdeladress", value);
}
export function APIchangeUserName<T>(value: string) {
	return request.post<T, UserReceiveData>("/user/changeUsername", { username: value });
}
export function APIchangeUserAvatar<T>(file: FormData) {
	return request.post<T, UserReceiveData>("/user/uploadAvatar", file, {
		headers: { "Content-Type": "multipart/form-data" },
	});
}

import axios, { AxiosRequestConfig } from "axios";
import { BASEURL } from "@/env";
axios.defaults.baseURL = BASEURL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

axios.interceptors.request.use(
	(requestConfig: AxiosRequestConfig) => {
		const accessToken = sessionStorage.getItem("access_token");
		accessToken ? (requestConfig.headers["Authorization"] = `Bearer ${accessToken}`) : null;
		return requestConfig;
	},
	(error: any) => Promise.reject(error)
);

axios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error: any) => Promise.reject(error)
);

export default axios;

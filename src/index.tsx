import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store";
import { ConfigProvider } from "antd";
import "@/assets/style/common.less";
import { ConnectedRouter } from "connected-react-router";
import history from "@/history";
import Tabs from "@/components/Tabs";
import { noNetWork, userInstalled, registerServiceWorker } from "./serviceworker";

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<ConfigProvider>
				<main className="main-container">
					<Suspense fallback={null}>
						<Switch>
							<Route
								path="/"
								exact
								component={lazy(() =>
									import(
										/* webpackChunkName: "home" */ /*webpackPrefetch:true*/ "@/routes/Home"
									)
								)}
							></Route>
							<Route
								path="/cart"
								exact
								component={lazy(() =>
									import(
										/* webpackChunkName: "cart" */ /*webpackPrefetch:true*/ "@/routes/Cart"
									)
								)}
							></Route>
							<Route
								path="/profile"
								exact
								component={lazy(() =>
									import(
										/* webpackChunkName: "profile" */ /*webpackPrefetch:true*/ "@/routes/Profile"
									)
								)}
							></Route>
							<Route
								path="/profilecollection"
								exact
								component={lazy(() => import("@/routes/ProfileCollection"))}
							></Route>
							<Route
								path="/profilehistory"
								exact
								component={lazy(() => import("@/routes/ProfileHistory"))}
							></Route>
							<Route
								path="/profilereceive"
								exact
								component={lazy(() => import("@/routes/ProfileReceive"))}
							></Route>
							<Route
								path="/profilepackage"
								exact
								component={lazy(() => import("@/routes/ProfilePackage"))}
							></Route>
							<Route
								path="/profilereceiveadd"
								exact
								component={lazy(() => import("@/routes/ProfileReceiveAdd"))}
							></Route>
							<Route
								path="/profileforget"
								exact
								component={lazy(() => import("@/routes/ProfileForget"))}
							></Route>
							<Route
								path="/settle"
								exact
								component={lazy(() => import("@/routes/Settle"))}
							></Route>
							<Route
								path="/search"
								exact
								component={lazy(() =>
									import(/*webpackPrefetch:true*/ "@/routes/Search")
								)}
							></Route>
							<Route
								path="/login"
								exact
								component={lazy(() => import("@/routes/Login"))}
							></Route>
							<Route
								path="/register"
								exact
								component={lazy(() => import("@/routes/Register"))}
							></Route>
							<Route
								path="/profileedit"
								exact
								component={lazy(() => import("@/routes/ProfileEdit"))}
							></Route>
							<Route
								path="/productdetail/:id"
								exact
								component={lazy(() =>
									import(/*webpackPrefetch:true*/ "@/routes/ProductDetail")
								)}
							></Route>
						</Switch>
					</Suspense>
				</main>
				<Tabs></Tabs>
			</ConfigProvider>
		</ConnectedRouter>
	</Provider>,

	document.getElementById("root")
);
registerServiceWorker();
noNetWork();
userInstalled();

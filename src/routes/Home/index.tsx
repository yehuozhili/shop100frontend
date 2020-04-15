import React, { PropsWithChildren, useRef, useEffect, useState } from "react";
import "./index.less";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./components/HomeHeader";
import { CombinedState, HomeState } from "@/typings";
import homeDispatchAction, { mapDispatchToProps } from "@/store/actions/home";
import HomeSlider from "./components/HomeSlider";
import HomeProduct from "./components/HomeProduct";
import Loader from "../../components/Loader";
import { loadMore, downRefresh } from "@/utils";
import { Icon } from "antd";
import { installApp, ReceiveWorker } from "@/serviceworker";
type Props = PropsWithChildren<
	RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps
>;

function Home(props: Props) {
	const homeContainer: React.RefObject<HTMLDivElement> = useRef(null);
	const refresh: React.RefObject<HTMLDivElement> = useRef(null);
	const [loading, setLoading] = useState(true);
	const [sloading, setsLoading] = useState(true);
	useEffect(() => {
		loadMore(homeContainer.current as HTMLDivElement, props.getProducts);
		downRefresh(
			homeContainer.current as HTMLDivElement,
			props.refreshProduct,
			refresh.current as HTMLDivElement
		);
		return () => {
			if (homeContainer.current)
				localStorage.setItem("homeScrollTop", homeContainer.current.scrollTop + "");
		};
	}, []);
	useEffect(() => {
		if (sloading && props.renderProduct.productList.length > 0) {
			setsLoading(false);
			installApp();
			ReceiveWorker();
		}
	}, [props.renderProduct]);

	return (
		<>
			<HomeHeader
				currentCategory={props.currentCategory}
				setCurrentCategory={props.setCurrentCategory}
				refreshProduct={props.refreshProduct}
			></HomeHeader>
			<div
				style={{ display: !sloading && !loading ? "none" : "block" }}
				className="home-main-wrapper"
			>
				<Loader />
			</div>
			<div
				style={{ display: !sloading && !loading ? "block" : "none" }}
				className="home-main-wrapper"
			>
				<div className="home-refresh-none" ref={refresh} key="refresh">
					<Icon type="down-circle"></Icon>
					<span>下拉刷新</span>
				</div>
				<div className="home-main-container" ref={homeContainer}>
					<div className="home-slider">
						<HomeSlider
							sliders={props.sliders}
							getSliders={props.getSliders}
						></HomeSlider>
					</div>
					<div className="home-main-list">
						<HomeProduct
							getProducts={props.getProducts}
							renderProduct={props.renderProduct}
							currentCategory={props.currentCategory}
							homeContainer={homeContainer}
							loadFunc={setLoading}
						></HomeProduct>
					</div>
				</div>
			</div>
		</>
	);
}
const mapStateToProps = (state: CombinedState): HomeState => state.home;

export default connect(mapStateToProps, homeDispatchAction)(Home);

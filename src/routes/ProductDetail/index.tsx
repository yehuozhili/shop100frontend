import React, { useEffect, PropsWithChildren, useState, useRef } from "react";
import "./index.less";
import { Product, CombinedState } from "@/typings";
import { Button, Carousel, Progress, Spin, Icon } from "antd";
import Nav from "@/components/Nav";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { connect } from "react-redux";
import ProductDetailDispatchAction, { mapDispatchToProps } from "@/store/actions/ProductDetail";
import CartDispatchAction, {
	mapDispatchToProps as cartDispatchActionType,
} from "@/store/actions/cart";
import { throttle, randomColor } from "@/utils";
import HomeLoader from "../../components/Loader";

interface Params {
	id: string;
}
type Props = PropsWithChildren<
	RouteComponentProps<Params, StaticContext, Product> &
		ReturnType<typeof mapStateToProps> &
		cartDispatchActionType &
		mapDispatchToProps
>;
function handleSubmitDetail() {
	const cartIcon = document.querySelector(".anticon-shopping-cart");

	if (cartIcon) {
		const destinationTop = cartIcon.getBoundingClientRect().top;
		const destinationLeft = cartIcon.getBoundingClientRect().left;
		const destinationRight = cartIcon.getBoundingClientRect().right;
		const shopcart = document.querySelector(".bounceButton");
		if (!shopcart) return;
		const top = shopcart.getBoundingClientRect().top;
		const right = shopcart.getBoundingClientRect().right;
		const left = shopcart.getBoundingClientRect().left;
		const randomPosition = Math.random() * (right - left) + left;
		const clonIcon = cartIcon.cloneNode(true) as HTMLDivElement;
		const rootSize = parseFloat(document.documentElement.style.fontSize);
		const moveX =
			randomPosition -
			((destinationRight - destinationLeft) / 2 + destinationLeft - rootSize * 0.25);
		const moveY = destinationTop - top;
		clonIcon.style.cssText = `
			z-index:10000;
			position:absolute;
			top:${top}px;
			left:${randomPosition}px;
			font-size:0.5rem;
			color:${randomColor()};
			pointer-events:none;
			transition:all 1s linear;
		`;
		const child = clonIcon.children[0] as SVGAElement;
		child.style.cssText = `
			transition:all 1s cubic-bezier(0.13,-0.43,0.76,-0.26);
		`;
		document.body.appendChild(clonIcon);
		setTimeout(() => {
			clonIcon.style.transform = `translateX(${-moveX}px)`;
			child.style.transform = `translateY(${moveY}px)`;
		});
		setTimeout(() => {
			clonIcon.parentNode?.removeChild(clonIcon);
		}, 1000);
	}
}
function DetailProduct(props: Props) {
	useEffect(() => {
		const id = props.match.params.id;
		props.getProductsDetails(id);
	}, [props.match.params.id]);

	const [sliderLoading, setSliderLoading] = useState({
		imgOK: 0,
		len: props.data.sliderpic.length,
		percent: 0,
	});

	useEffect(() => {
		setSliderLoading({
			imgOK: 0,
			len: props.data.sliderpic.length,
			percent: 0,
		});
		return () => {
			setSliderLoading({
				imgOK: 0,
				len: props.data.sliderpic.length,
				percent: 100,
			});
		};
	}, [props.match.params.id, props.data.sliderpic]);

	const sliderload = () => {
		setSliderLoading((state: any) => {
			let p: number;
			if (state.len > 1) {
				p = Math.floor((state.imgOK / (state.len * 2)) * 100);
			} else {
				p = Math.floor(((state.imgOK + 1) / state.len) * 100);
			}

			return { len: state.len, imgOK: state.imgOK + 1, percent: p };
		});
	};

	const detailRef = useRef<HTMLDivElement>(null);
	const [backTopState, setBackTopState] = useState<boolean>();
	function scrollOpacity(e: Event) {
		const target = e.target as HTMLDivElement;
		if (target.scrollTop > 500) {
			setBackTopState(true);
		} else {
			setBackTopState(false);
		}
	}
	useEffect(() => {
		if (sliderLoading.percent == 100) {
			detailRef.current?.addEventListener("scroll", throttle(scrollOpacity, 500));
		}
		return detailRef.current?.removeEventListener("scroll", throttle(scrollOpacity, 500));
	}, [sliderLoading.percent]);
	const backtopFunc = () => {
		if (detailRef.current) {
			detailRef.current.scrollTop = 0;
		}
	};

	const handleSubmit = (product: Product) => {
		handleSubmitDetail();
		props.addCartItem(product);
	};

	const toCollection = () => {
		const id = props.match.params.id;
		props.favouriteLoading ? null : props.addUserFavourite(id);
	};

	return (
		<>
			<Nav history={props.history}>商品详情</Nav>
			<div id="backTop" onClick={backtopFunc} className={backTopState ? "visible" : ""}>
				<Icon type="up"></Icon>
			</div>
			{props.detailLoading && (
				<div className="detail-spin">
					<Spin />
				</div>
			)}
			{!props.detailLoading && (
				<>
					<div
						style={{
							display: sliderLoading.percent == 100 ? "none" : "block",
							height: "100%",
						}}
						className="detail-progress"
					>
						<Progress
							strokeColor={{
								"0%": "#108ee9",
								"100%": "#87d068",
							}}
							percent={Math.floor((sliderLoading.imgOK / sliderLoading.len) * 100)}
						/>
						<HomeLoader />
					</div>
					<div
						className="detailcontent"
						style={{
							display: sliderLoading.percent == 100 ? "block" : "none",
						}}
						ref={detailRef}
					>
						<div className="detail-product-slider">
							<Carousel lazyLoad="progressive">
								{props.data.sliderpic.map((item: string, index: number) => {
									return (
										<div key={props.product.id + index}>
											<img src={item} onLoad={sliderload} />
										</div>
									);
								})}
							</Carousel>
						</div>
						<div className="detail-product-middle">
							<div className="detail-product-title">{props.product.title}</div>
							<div className="detail-product-price">
								<div>￥{props.product.price}元</div>
								<div>
									<Icon
										type="heart"
										theme={props.detailfavourite ? "filled" : "outlined"}
										onClick={toCollection}
									></Icon>

									<Button
										onClick={() => handleSubmit(props.product)}
										className="bounceButton"
									>
										加入购物车
									</Button>
								</div>
							</div>
							<div>{props.data.texty}</div>
						</div>
						<div className="detail-product-provoke">
							{props.data.footerpic.map((item: string, index: number) => (
								<img src={item} key={props.product.id + index} />
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}
const mapStateToProps = (state: CombinedState) => state.productDetail;
const mapToDispatchProp = Object.assign({}, ProductDetailDispatchAction, CartDispatchAction);
export default connect(mapStateToProps, mapToDispatchProp)(DetailProduct);

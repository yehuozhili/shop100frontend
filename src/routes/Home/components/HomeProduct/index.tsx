import React, { useEffect, PropsWithChildren, useState } from "react";
import "./index.less";
import QueueAnim from "rc-queue-anim";
import { RenderProduct, Product } from "@/typings";
import { Card, Button, Icon } from "antd";
import { Link } from "react-router-dom";
import Virtualize from "@/components/Virtualize";
type Props = PropsWithChildren<{
	getProducts: () => void;
	renderProduct: RenderProduct;
	currentCategory: string;
	homeContainer: React.RefObject<HTMLDivElement>;
	loadFunc: React.Dispatch<React.SetStateAction<boolean>>;
}>;

function HomeProduct(props: Props) {
	const [io, setIo] = useState<IntersectionObserver>(); //实测可能不兼容safari

	const opts = {
		root: props.homeContainer.current,
	};
	const callback = (e: IntersectionObserverEntry[]) => {
		e.forEach((item: IntersectionObserverEntry) => {
			const ele = item.target as HTMLDivElement;
			const src = ele.dataset.src;
			if (item.intersectionRatio === 0) {
				ele.innerHTML =
					'<i aria-label="icon: picture" class="anticon anticon-picture"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="picture" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2zM304 456a88 88 0 1 0 0-176 88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"></path></svg></i>';
			} else {
				ele.innerHTML = `<img src=${src} style='width:100%;height:100%'></img>`;
			}
		});
	};

	const [rootSize, setRootSize] = useState(parseFloat(document.documentElement.style.fontSize));
	useEffect(() => {
		setIo(new IntersectionObserver(callback, opts));
		if (props.renderProduct.productList.length == 0) {
			props.getProducts();
		}
		window.addEventListener("resize", setRootFunc, false);
		return () => {
			io?.disconnect();
			window.removeEventListener("resize", setRootFunc);
		};
	}, []);

	function setRootFunc() {
		const rootSize: number = parseFloat(document.documentElement.style.fontSize);
		setRootSize(rootSize);
	}
	const onloadFunc = () => {
		const lastTop = localStorage.getItem("homeScrollTop");
		props.loadFunc(false);
		if (lastTop) {
			setTimeout(() => {
				if (props.homeContainer.current)
					props.homeContainer.current.scrollTop = parseFloat(lastTop);
			});
		}
	};
	return (
		<QueueAnim delay={200}>
			<div className="home-product-list" key="list">
				<h2 key="home-product-list-h2">
					{props.currentCategory == "all" ? "全部商品" : props.currentCategory}
				</h2>

				{
					<Virtualize
						itemHeight={rootSize * 4.5596}
						columnNumber={2}
						insightNumber={
							Math.ceil(
								(document.body.offsetHeight - rootSize * 2.2) / (rootSize * 4.5596)
							) * 2
						}
						startHeight={rootSize * 6}
						scrollDom={document.querySelector(".home-main-container")}
						onloadFunc={onloadFunc}
					>
						{props.renderProduct.productList.map((item: Product) => {
							return (
								<Link
									key={item.id}
									to={{
										pathname: `/productdetail/${item.id}`,
									}}
								>
									<Card
										hoverable
										key={item.id}
										cover={
											<div
												data-src={item.poster}
												className="list-item"
												ref={(ref) => {
													if (ref) {
														if (io) io.observe(ref);
													}
												}}
											>
												<Icon type="picture"></Icon>
												{/* <img src={item.poster} style={{width:'100%',height:'100%'}}></img> */}
											</div>
										}
									>
										<Card.Meta
											title={item.title}
											description={`价格：${item.price}元`}
										/>
									</Card>
								</Link>
							);
						})}
					</Virtualize>
				}
			</div>
			<div className="product-footer">
				{props.renderProduct.more ? (
					<Button
						onClick={() => props.getProducts()}
						loading={props.renderProduct.loading}
					>
						{props.renderProduct.loading ? "加载中" : "加载更多"}
					</Button>
				) : (
					<div className="end">我是有底线的</div>
				)}
			</div>
		</QueueAnim>
	);
}
export default HomeProduct;

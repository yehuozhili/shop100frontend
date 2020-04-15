import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./index.less";
import logo from "@/assets/images/logo.jpg";
import { Icon } from "antd";
import classnames from "classnames";
import QueueAnim from "rc-queue-anim";
import Texty from "rc-texty";

interface Props {
	currentCategory: string;
	setCurrentCategory: (currentCategory: string) => any;
	refreshProduct: Function;
}

function HomeHeader(props: Props) {
	const [ulvisible, setulvisible] = useState(false);
	const mask = useRef<HTMLDivElement>(null);
	const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
		event.stopPropagation();
		const target = event.target as HTMLUListElement;
		const category = target.dataset.category as string;
		if (category) {
			props.setCurrentCategory(category);
			props.refreshProduct();
			setulvisible(false);
		} else {
			setulvisible(false);
		}
	};
	const clientWidth = document.body.clientWidth;
	const clientHeight = document.body.clientHeight;

	const setVisible = () => {
		setulvisible((ulvisible) => !ulvisible);
	};

	return (
		<QueueAnim>
			<header className="home-header" key="homeheader">
				<div className="home-logo">
					<img src={logo} className="homelogo"></img>
					<Icon
						type="bars"
						onClick={setVisible}
						className={classnames({ active: ulvisible === true })}
					></Icon>
				</div>
				<QueueAnim delay={200}>
					{ulvisible &&
						createPortal(
							<>
								<ul className="category" onClick={setCurrentCategory} key="ul">
									<li
										data-category="all"
										className={classnames({
											active: props.currentCategory === "all",
										})}
									>
										<Texty type={"left"}>全部商品</Texty>
									</li>
									<li
										data-category="益生君"
										className={classnames({
											active: props.currentCategory === "益生君",
										})}
									>
										<Texty type={"right"}>益生君</Texty>
									</li>
									<li
										data-category="天天艾"
										className={classnames({
											active: props.currentCategory === "天天艾",
										})}
									>
										<Texty type={"left"}>天天艾</Texty>
									</li>
									<li
										data-category="101轻体日记"
										className={classnames({
											active: props.currentCategory === "101轻体日记",
										})}
									>
										<Texty type={"right"}>101轻体日记</Texty>
									</li>
									<li
										data-category="暖暖灸"
										className={classnames({
											active: props.currentCategory === "暖暖灸",
										})}
									>
										<Texty type={"left"}>暖暖灸</Texty>
									</li>
									<li
										data-category="小花样"
										className={classnames({
											active: props.currentCategory === "小花样",
										})}
									>
										<Texty type={"right"}>小花样</Texty>
									</li>
								</ul>

								<div
									className="mask"
									ref={mask}
									onClick={() => {
										setulvisible(false);
									}}
									style={{
										width: clientWidth,
										height: clientHeight,
									}}
								></div>
							</>,
							window.document.body
						)}
				</QueueAnim>
			</header>
		</QueueAnim>
	);
}
export default HomeHeader;

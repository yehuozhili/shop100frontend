import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./index.less";
import cityData from "@/assets/city.json";
interface Props {
	display: boolean; //操作显示
	setState: (value: React.SetStateAction<boolean>) => void; //用于组件内关闭
	callbackFunc: (value: string) => void;
}
interface RenderState {
	nextLis: Array<string>;
	open: boolean;
}
function CityPicker(props: Props) {
	const [secRender, setsecRender] = useState<RenderState>({
		nextLis: [],
		open: false,
	});
	const [thirdRender, setThirdRender] = useState<RenderState>({
		nextLis: [],
		open: false,
	});
	const [userPick, setUserPick] = useState<Array<string>>(["请选择", "请选择", "请选择"]); //最后拼接值

	const firstReg = /^[0-9][0-9]0000$/;

	const toChangeNext = (item: string) => {
		const itemHead = item.slice(0, 2);
		const secReg = new RegExp(`^${itemHead}[0-9]([1-9]|(?!0)[0-9])00$`);
		let nextLis = Object.keys(cityData).filter((it) => secReg.exec(it));
		if (nextLis.length === 0) {
			nextLis = [item]; //如果是空，就是直辖市
		}
		setUserPick([item, "请选择", "请选择"]);
		setsecRender({
			nextLis,
			open: true,
		});
		setThirdRender({
			//选第一级第三级数据就变了
			nextLis: [],
			open: false,
		});
	};
	const toChangeThird = (item: string) => {
		const itemHead = item.slice(0, 4);
		const cityKeys = Object.keys(cityData);
		const thirdReg = new RegExp(`^${itemHead}[0-9]([1-9]|(?!0)[0-9])$`);
		let nextLis = cityKeys.filter((it) => thirdReg.exec(it));
		if (nextLis.length === 0) {
			const path = item.slice(0, 2);
			const sReg = new RegExp(`${path}01[0-9]{2}`);
			nextLis = cityKeys.filter((it) => sReg.exec(it));
		} //如果是空，是直辖市
		if (nextLis.length === 0) {
			console.error("请检查数据");
		}

		const lis = userPick;
		lis[1] = item;
		lis[2] = "请选择";
		setUserPick(lis);

		setThirdRender({
			nextLis,
			open: true,
		});
		setsecRender({
			...secRender,
			open: false,
		});
	};
	const toFinal = (item: string) => {
		const lis = userPick;
		lis[2] = item;
		setUserPick([...lis]); //相当于强制刷新
		const fivalue = lis.reduce((prev, next) => {
			if (prev === cityData[next]) return prev;
			prev = prev + cityData[next];
			return prev;
		}, "");
		props.callbackFunc(fivalue);
		props.setState(false);
	};
	return createPortal(
		<>
			<div
				className="city-picker-container"
				style={{
					animation: props.display ? "conainerSlide 0.1s linear" : "",
					display: props.display ? "" : "none",
				}}
			>
				<div className="city-picker-main">
					<div className="city-picker-title">所在地区</div>
					<div className="city-picker-display">
						{userPick.map((item, index) => {
							return (
								<span key={index}>
									{item === "请选择" ? "请选择" : cityData[item]}
								</span>
							);
						})}
					</div>
					<div className="city-picker-x">
						{Object.keys(cityData)
							.filter((item) => firstReg.exec(item))
							.map((item) => {
								return (
									<div key={item} onClick={() => toChangeNext(item)}>
										{cityData[item]}
									</div>
								);
							})}
					</div>
					<div
						className="city-picker-y"
						style={{ display: secRender.open ? "" : "none" }}
					>
						{secRender.nextLis.map((item) => {
							return (
								<div key={item} onClick={() => toChangeThird(item)}>
									{cityData[item]}
								</div>
							);
						})}
					</div>
					<div
						className="city-picker-z"
						style={{ display: thirdRender.open ? "" : "none" }}
					>
						{thirdRender.nextLis.map((item) => {
							return (
								<div key={item} onClick={() => toFinal(item)}>
									{cityData[item]}
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div
				className="city-picker-mask"
				style={{ display: props.display ? "" : "none" }}
				onClick={() => props.setState(false)}
			></div>
			, window.document.body
		</>,
		document.body
	);
}

export default CityPicker;

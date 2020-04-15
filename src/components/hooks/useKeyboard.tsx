import { useState, useEffect } from "react";

interface DomArgs {
	height: number;
	bottom: number;
}
/**
 *
 *
 * @param {string} 滚动dom
 * @param {DomArgs} 滚动dom高和底部高，异步获取
 * @param {number} difference 滚动dom高最后需要减去的差值
 * @param {number} fixDifference 绝对定位元素，随着键盘一起移动高度
 */
export function useKeyBoardSolve(
	name: string,
	domargs: DomArgs,
	difference: number,
	fixDifference: number
) {
	const [originHeight] = useState(
		document.documentElement.clientHeight || document.body.clientHeight
	);
	const [scrollOrigin, setScrollOrigin] = useState({
		sign: true,
		height: 0,
	});
	const [origin, setOrigin] = useState({
		height: 0,
		bottom: 0,
	});
	const resizeHandler = () => {
		const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
		const activeElement = document.activeElement;
		const scrollDom = document.querySelector<HTMLFormElement>(`.${name}`);
		const scrollHeight = scrollDom?.getBoundingClientRect().height;
		if (resizeHeight < originHeight) {
			if (
				activeElement &&
				(activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
			) {
				if (scrollDom && scrollHeight) {
					setScrollOrigin({
						sign: false,
						height: originHeight - resizeHeight,
					});
					setTimeout(() => {
						activeElement.scrollIntoView({ block: "center" });
					});
				}
			}
		} else {
			if (scrollDom && scrollHeight) {
				setScrollOrigin({
					sign: true,
					height: 0,
				});
			}
		}
	};
	useEffect(() => {
		setOrigin({
			height: domargs.height,
			bottom: domargs.bottom,
		});
	}, [domargs]);
	useEffect(() => {
		const scrollDom = document.querySelector<HTMLFormElement>(`.${name}`);
		if (scrollOrigin.sign) {
			//原始高度
			if (scrollDom && origin.height !== 0) {
				scrollDom.style.height = origin.height + "px";
				scrollDom.style.overflow = "scroll";
			}
		} else {
			//给改变高度
			if (scrollDom) {
				//如果键盘高度比dom底部高度大，应该dom原本高度减去底部高度与键盘高度的差
				if (origin.bottom < scrollOrigin.height + difference + fixDifference) {
					scrollDom.style.height =
						origin.height -
						(scrollOrigin.height - origin.bottom + difference + fixDifference) +
						"px";
					scrollDom.style.overflow = "scroll";
				} //键盘没dom底部长不需要卷曲
			}
		}
	}, [scrollOrigin]);
	useEffect(() => {
		const ua = window.navigator.userAgent.toLocaleLowerCase();
		// const isIOS = /iphone|ipad|ipod/.test(ua);
		const isAndroid = ua.includes("android");
		if (isAndroid) {
			window.addEventListener("resize", resizeHandler);
		}
	}, []);
}

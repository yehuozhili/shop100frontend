import React, { PropsWithChildren, useEffect, useState, ReactNode } from "react";

import "./index.less";
import { throttle } from "@/utils";

type Props = PropsWithChildren<{
	itemHeight: number; //每个元素高
	columnNumber: number; //一行几个元素
	insightNumber: number; //可视范围里几个元素
	startHeight: number; //滚动到第一个元素的高度
	scrollDom: HTMLDivElement | null; //有滚动条的dom
	scaleRow?: number; //扩展行数
	onloadFunc?: () => void; //装载完成回调函数。
}>;

function Virtualize(props: Props) {
	const [costomHeight, setCostomHeight] = useState<number>();
	const [visbleHeight, setVisibleHeight] = useState<number>();
	const [renderChildren, setRenderChildren] = useState<Array<ReactNode>>();
	const [indexNumber, setIndexNumber] = useState({
		startIndex: 0,
		endIndex: props.insightNumber,
		overScroll: 0,
	});
	const [scaleRow, setScaleRow] = useState(2);
	useEffect(() => {
		if (props.children instanceof Array) {
			let childrenLen = props.children.length;
			if (childrenLen % props.columnNumber != 0) {
				//说明最后一行没满
				const remain = childrenLen % props.columnNumber;
				childrenLen = childrenLen + remain;
			}
			const fullheight = (childrenLen / props.columnNumber) * props.itemHeight;
			setCostomHeight(fullheight);
			let insightHeight;

			if (childrenLen < props.insightNumber) {
				//传来长度小于可视长度情况
				insightHeight = fullheight;
			} else {
				insightHeight = (props.insightNumber / props.columnNumber) * props.itemHeight;
			}

			const scuRender = props.children.slice(indexNumber.startIndex, indexNumber.endIndex);

			setVisibleHeight(insightHeight);
			setRenderChildren(scuRender);
		}
	}, [props.children, indexNumber]);
	const scrollFunc = (e: Event) => {
		const target = e.target as HTMLDivElement;
		let overScroll = target.scrollTop - props.startHeight; //卷曲高度
		let timer = (overScroll / props.itemHeight) * props.columnNumber;
		let startIndex = Math.floor(timer); //起始索引 从0开始
		startIndex = startIndex < 0 ? 0 : startIndex;
		timer = (timer % props.columnNumber) / props.columnNumber; //滚的每行百分比
		if (timer < 0) timer = 0;
		if (overScroll < 0) overScroll = 0;
		if (startIndex % props.columnNumber != 0) {
			//每行没补满
			startIndex = startIndex - (startIndex % props.columnNumber);
		}
		const endIndex = startIndex + props.insightNumber + scaleRow;
		overScroll = overScroll - timer * props.itemHeight;
		setTimeout(() => {
			setIndexNumber({
				startIndex,
				endIndex,
				overScroll,
			});
		});
	};
	useEffect(() => {
		props.scaleRow ? setScaleRow(props.scaleRow) : null;
		if (props.scrollDom) props.scrollDom.addEventListener("scroll", throttle(scrollFunc, 50));
		if (props.onloadFunc) props.onloadFunc();
		return () => {
			if (props.scrollDom)
				props.scrollDom.removeEventListener("scroll", throttle(scrollFunc, 50));
		};
	}, [props.scrollDom]);
	return (
		<>
			<div className="virtual-container">
				<div
					style={{
						height: costomHeight ? costomHeight : 0,
					}}
				></div>
				<div
					className="virtual-custom-item"
					style={{
						height: visbleHeight ? visbleHeight : 0,
						position: "relative",
						transform: `translate3d(0px, ${indexNumber.overScroll}px, 0px)`,
					}}
				>
					{renderChildren}
				</div>
			</div>
		</>
	);
}
export default Virtualize;

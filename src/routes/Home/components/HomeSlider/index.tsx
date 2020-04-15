import React, { useEffect, PropsWithChildren } from "react";
import "./index.less";
import QueueAnim from "rc-queue-anim";
import { Carousel } from "antd";
import { Slider } from "@/typings";

type Props = PropsWithChildren<{
	sliders: Slider[];
	getSliders: () => void;
}>;

function HomeSlider(props: Props) {
	useEffect(() => {
		if (props.sliders.length == 0) {
			props.getSliders();
		}
	}, []);

	return (
		<QueueAnim delay={200}>
			<Carousel autoplay key="slider" lazyLoad="progressive">
				{props.sliders &&
					props.sliders.map((item: Slider) => (
						<div key={item.id}>
							<img src={item.url} />
						</div>
					))}
			</Carousel>
		</QueueAnim>
	);
}
export default HomeSlider;

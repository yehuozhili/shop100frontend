import React from "react";
import QueueAnim from "rc-queue-anim";
import "./index.less";
import logo from "@/assets/images/logo.jpg";
function Loader() {
	return (
		<QueueAnim type="alpha" style={{ height: "100%" }}>
			<div className="home-Loader" key="homeloader">
				<div className="ball"> </div>
				<img src={logo}></img>
				<div className="text">加载中</div>
			</div>
		</QueueAnim>
	);
}
export default Loader;

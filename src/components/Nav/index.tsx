import React, { PropsWithChildren, memo } from "react";
import { Icon } from "antd";
import "./index.less";
import { History } from "history";
import QueueAnim from "rc-queue-anim";

type Props = PropsWithChildren<{
	history: History;
}>;
function Nav(props: Props) {
	return (
		<QueueAnim>
			<nav className="nav-header" key="navbar">
				<Icon type="left" onClick={() => props.history.goBack()}></Icon>
				{props.children}
			</nav>
		</QueueAnim>
	);
}
export default memo(Nav);

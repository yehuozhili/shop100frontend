import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Badge } from "antd";
import "./index.less";
import { connect } from "react-redux";
import { CombinedState, CartState } from "@/typings";

interface Props {
	cart: CartState;
}
function Tabs(props: Props) {
	return (
		<footer>
			<NavLink exact to="/">
				<Icon type="shopping"></Icon>
				<span>商品</span>
			</NavLink>
			<NavLink exact to="/search">
				<Icon type="search"></Icon>
				<span>搜索</span>
			</NavLink>
			<NavLink exact to="/cart">
				<Badge count={props.cart.reduce((prev, next) => prev + next.count, 0)}>
					<Icon type="shopping-cart"></Icon>
					<span>购物车</span>
				</Badge>
			</NavLink>
			<NavLink exact to="/profile">
				<Icon type="user"></Icon>
				<span>个人中心</span>
			</NavLink>
		</footer>
	);
}

const mapDispatchToState = (state: CombinedState) => ({ cart: state.cart });
export default connect(mapDispatchToState)(Tabs);

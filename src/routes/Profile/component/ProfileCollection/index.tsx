import React from "react";
import "./index.less";
import { Icon } from "antd";
import { Link } from "react-router-dom";

function ProfileCollection() {
	return (
		<div className="profile-container">
			<div className="profile-search">
				<Link to="/search">
					<Icon type="search"></Icon>
					<span>搜索商品</span>
				</Link>
			</div>
			<div className="profile-list">
				<Link to="/profilepackage">
					<div className="profile-lis">
						<Icon type="gift"></Icon>
						<span> 包裹状态</span>
					</div>
					<Icon type="right"></Icon>
				</Link>
				<Link to="/profilereceive">
					<div className="profile-lis">
						<Icon type="audit"></Icon>
						<span> 我的地址簿</span>
					</div>
					<Icon type="right"></Icon>
				</Link>
				<Link to="/cart">
					<div className="profile-lis">
						<Icon type="shopping-cart"></Icon>
						<span> 我的购物车</span>
					</div>
					<Icon type="right"></Icon>
				</Link>
				<Link to="/profilecollection">
					<div className="profile-lis">
						<Icon type="star"></Icon>
						<span> 我的收藏</span>
					</div>
					<Icon type="right"></Icon>
				</Link>
				<Link to="/profilehistory">
					<div className="profile-lis">
						<Icon type="history"></Icon>
						<span> 我的浏览历史</span>
					</div>
					<Icon type="right"></Icon>
				</Link>
			</div>
		</div>
	);
}

export default ProfileCollection;

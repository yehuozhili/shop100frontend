import React, { PropsWithChildren, useState, useEffect } from "react";
import Nav from "@/components/Nav";
import { RouteComponentProps, Link } from "react-router-dom";
import { mapDispatchToProps } from "@/store/actions/profile";
import { CombinedState, ProfileState, Product } from "@/typings/";
import "./index.less";
import profileDispatchAction from "@/store/actions/profile";
import { connect } from "react-redux";
import { Icon } from "antd";
import ProductDetailDispatchAction, {
	mapDispatchToProps as ProductDetailDispatchType,
} from "@/store/actions/ProductDetail";

type Props = PropsWithChildren<
	RouteComponentProps &
		ReturnType<typeof mapStateToProps> &
		mapDispatchToProps &
		ProductDetailDispatchType
>;
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

function ProfileCollection(props: Props) {
	useEffect(() => {
		props.getCollectDetail();
	}, []);
	const [heartArr, setHeartArr] = useState<Array<"filled" | "outlined" | "twoTone">>([]);
	useEffect(() => {
		const len = props.renderCollect.length;
		const arr = new Array(len).fill("filled");
		setHeartArr(arr);
	}, [props.renderCollect]);
	const changeHeart = (index: number, id: string) => {
		if (!props.favLoading) {
			props.profileChangeFavourite(index, id);
		}
	};
	useEffect(() => {
		if (props.favChange) {
			if (props.favChange.data !== null) {
				// eslint-disable-next-line prefer-const
				let data = heartArr;
				data[props.favChange.index] = props.favChange.data ? "filled" : "outlined";
				setHeartArr(data);
			}
		}
	}, [props.favChange]);
	return (
		<>
			<Nav history={props.history}>我的收藏</Nav>
			<div className="profile-collect">
				{props.renderCollect.map((item: Product, index: number) => {
					return (
						<div key={item.id} className="profile-collect-item">
							<div className="profile-collect-left">
								<Link to={`/productdetail/${item.id}`}>
									<img src={item.poster} />
									<div className="profile-collect-text">
										<div>{item.title}</div>
										<div>￥{item.price}</div>
									</div>
								</Link>
							</div>
							<div className="profile-collect-icon">
								<Icon
									type="heart"
									theme={heartArr[index]}
									onClick={() => changeHeart(index, item.id)}
								></Icon>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

const mapToDispatchProp = Object.assign({}, ProductDetailDispatchAction, profileDispatchAction);

export default connect(mapStateToProps, mapToDispatchProp)(ProfileCollection);

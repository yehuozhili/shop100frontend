import React, { PropsWithChildren, useState, useEffect } from "react";
import Nav from "@/components/Nav";
import { RouteComponentProps } from "react-router-dom";
import { mapDispatchToProps } from "@/store/actions/profile";
import { CombinedState, CartItem, UserReceive } from "@/typings/";
import "./index.less";
import profileDispatchAction from "@/store/actions/profile";
import { connect } from "react-redux";
import { Button, message, Alert, InputNumber } from "antd";
import CartDispatchAction, { mapDispatchToProps as CartDispatch } from "@/store/actions/cart";
import AddressSelect from "./components/AddressSelect";

type Props = PropsWithChildren<
	RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps & CartDispatch
>;
const mapStateToProps = (state: CombinedState) =>
	Object.assign({}, state.profile, { cart: state.cart });

function Settle(props: Props) {
	const [displayChangeAddress, setDisplayChangeAddress] = useState(false);

	const finalSettle = () => {
		if (displayReceive.name === "") {
			message.error("地址未选择");
			return;
		}
		message.info("请自行接入支付接口");
	};
	useEffect(() => {
		props.validate();
	}, []);
	const checkNumber = props.cart
		.filter((item: CartItem) => item.checked)
		.reduce((prev, next) => prev + next.count, 0);
	const totalPrice = props.cart
		.filter((item: CartItem) => item.checked)
		.reduce((prev, next) => prev + next.count * next.product.price, 0);
	const [displayReceive, setDisplayReceive] = useState<Partial<UserReceive>>({
		name: "",
		phoneNumber: "",
		distinct: "",
		distinctDetail: "",
	});
	useEffect(() => {
		if (props.user) {
			const display = props.user.receive.filter((it) => it.checked);
			if (display.length === 1) {
				setDisplayReceive(display[0]);
			}
		}
	}, [props.user]);
	const selectFunc = (index: number) => {
		if (props.user) {
			const userReceive = props.user.receive[index];
			setDisplayReceive(userReceive);
		}
	};
	return (
		<>
			<Nav history={props.history}>确认订单</Nav>
			<div className="settle-container">
				{props.user && (
					<>
						<div
							className="settle-address"
							onClick={() => setDisplayChangeAddress(true)}
						>
							{displayReceive.name ? (
								<div className="settle-address-display">
									<div>
										<span>{displayReceive.name}</span>
										<span>{displayReceive.phoneNumber}</span>
									</div>
									<div>{displayReceive.distinct}</div>
									<div>{displayReceive.distinctDetail}</div>
								</div>
							) : (
								<div
									onClick={() => setDisplayChangeAddress(true)}
									className="settle-address-nodisplay"
								>
									请选择地址
								</div>
							)}
						</div>
						<div className="settle-product">
							{props.cart
								.filter((i) => i.checked)
								.map((item: CartItem) => {
									return (
										<div key={item.product.id} className="settle-item">
											<div className="settle-title">
												<img src={item.product.poster} alt="" />
												<div>
													<div className="settle-item-title">
														{item.product.title}
													</div>
													<div>价格：￥{item.product.price}</div>
													<div className="settle-change">
														数量：
														<InputNumber
															min={1}
															value={item.count}
															size="large"
															onChange={(value) => {
																props.changeCartItem(
																	item.product.id,
																	value
																);
															}}
														></InputNumber>
													</div>
												</div>
											</div>
										</div>
									);
								})}
						</div>
						<div className="settle-resolve">
							<span>共{checkNumber}件</span>
							<span> 合计{totalPrice}元</span>
							<Button onClick={finalSettle}>支付</Button>
						</div>
						<AddressSelect
							setState={setDisplayChangeAddress}
							callbackFunc={selectFunc}
							display={displayChangeAddress}
							displayData={props.user.receive}
						/>
					</>
				)}
				{!props.user && (
					<Alert type="warning" message="未登录" description="请登录后操作"></Alert>
				)}
			</div>
		</>
	);
}

const mapDispatchToProp = Object.assign({}, profileDispatchAction, CartDispatchAction);

export default connect(mapStateToProps, mapDispatchToProp)(Settle);

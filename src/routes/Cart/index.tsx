import React, { PropsWithChildren, useState } from "react";
import "./index.less";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import { CombinedState, CartState, Product, CartItem } from "@/typings";
import { Table, InputNumber, Popconfirm, Button, message } from "antd";
import { ColumnProps } from "antd/es/table";
import CartDispatchAction, { mapDispatchToProps } from "@/store/actions/cart";
import Nav from "@/components/Nav";

type Props = PropsWithChildren<
	RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps
>;

function Cart(props: Props) {
	const columns: ColumnProps<CartItem>[] = [
		{
			title: "商品",
			dataIndex: "product",
			align: "center",
			width: "2rem",
			render: (text: Product) => (
				<>
					<p>{text.title}</p>
				</>
			),
		},
		{
			title: "单价",
			dataIndex: "price",
			align: "center",
			render: (text: undefined, row: CartItem) => (
				<>
					<p>￥{row.product.price}</p>
				</>
			),
		},
		{
			title: "数量",
			dataIndex: "count",
			align: "center",
			render: (text: number, row: CartItem) => (
				<>
					<InputNumber
						min={1}
						value={text}
						onChange={(value) => {
							props.changeCartItem(row.product.id, value);
						}}
					></InputNumber>
				</>
			),
		},
		{
			title: "操作",
			align: "center",
			render: (text: number, row: CartItem) => (
				<>
					<Popconfirm
						title="是否删除商品"
						onConfirm={() => props.removeCartItem(row.product.id)}
						okText="是"
						cancelText="否"
						placement="left"
					>
						<Button>删除</Button>
					</Popconfirm>
				</>
			),
		},
	];
	const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>(
		props.cart.filter((item: CartItem) => item.checked).map((item: CartItem) => item.product.id)
	);
	const checkNumber = props.cart
		.filter((item: CartItem) => item.checked)
		.reduce((prev, next) => prev + next.count, 0);
	const totalPrice = props.cart
		.filter((item: CartItem) => item.checked)
		.reduce((prev, next) => prev + next.count * next.product.price, 0);
	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys: string[] | number[]) => {
			props.changeChecked(selectedRowKeys);
			setSelectedRowKeys(selectedRowKeys);
		},
	};
	const judgeSettle = () => {
		if (checkNumber == 0) {
			message.info("请选中商品进行结算");
		} else {
			props.history.push("/settle");
		}
	};
	return (
		<>
			<Nav history={props.history}>购物车</Nav>
			<Table
				columns={columns}
				dataSource={props.cart}
				pagination={false}
				rowSelection={rowSelection}
				rowKey={(record: CartItem) => record.key}
				locale={{ emptyText: "购物车竟然是空的。。" }}
				className="cart-table"
			></Table>
			<div className="cart-footer">
				<div className="settle">
					<div>
						<Button onClick={props.clearCartItem}>清空购物车</Button>
					</div>
					<div>
						<div>已选择了{checkNumber}件商品</div>
						<div>总价 {totalPrice}元</div>
					</div>
				</div>
				<div className="charge">
					<Button onClick={judgeSettle}>结算</Button>
				</div>
			</div>
		</>
	);
}
const mapStateToProps = (state: CombinedState): { cart: CartState } => ({
	cart: state.cart,
});

export default connect(mapStateToProps, CartDispatchAction)(Cart);

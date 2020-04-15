import React, { PropsWithChildren, useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { connect } from "react-redux";
import { CombinedState } from "@/typings/state";
import profileDispatchAction, { mapDispatchToProps } from "@/store/actions/profile";
import { RouteComponentProps } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form";
import Nav from "@/components/Nav";
import "./index.less";
import { useDomWithKeySolve } from "@/components/hooks/useDomWithKeySolve";

type Props = PropsWithChildren<
	RouteComponentProps &
		ReturnType<typeof mapStateToProps> &
		mapDispatchToProps &
		FormComponentProps
>;

function Register(props: Props) {
	const { getFieldDecorator } = props.form;

	useDomWithKeySolve(
		"ant-form",
		parseFloat(document.documentElement.style.fontSize) * 1.2,
		parseFloat(document.documentElement.style.fontSize) * 2
	);

	const [confirmDirty, setDirty] = useState(false);
	useEffect(() => {
		if (props.loginState == "LOGINED") {
			props.history.push("/profile");
		}
	}, []);
	const validateToNextPassword = (_rule: any, value: any, callback: any) => {
		const { form } = props;
		if (value && confirmDirty) {
			form.validateFields(["confirm"], { force: true });
		}
		callback();
	};
	const compareToFirstPassword = (_rule: any, value: any, callback: any) => {
		const { form } = props;
		if (value && value !== form.getFieldValue("password")) {
			callback("两次密码输入不一致");
		} else {
			callback();
		}
	};
	const handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setDirty(confirmDirty || !!value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.form.validateFieldsAndScroll((errors: any, values) => {
			if (errors) {
				message.error("注册信息有误");
			} else {
				props.register(values);
			}
		});
	};
	return (
		<>
			<Nav history={props.history}>用户注册</Nav>
			<Form className="register-form" onSubmit={handleSubmit} hideRequiredMark={true}>
				<Form.Item label="用户名">
					{getFieldDecorator("username", {
						rules: [
							{
								required: true,
								message: "用户名不能为空",
							},
							{
								max: 12,
								message: "必须小于12位",
							},
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="邮箱">
					{getFieldDecorator("email", {
						rules: [
							{
								type: "email",
								message: "必须是邮箱格式",
							},
							{
								required: true,
								message: "邮箱不能为空",
							},
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="密码" hasFeedback>
					{getFieldDecorator("password", {
						rules: [
							{
								required: true,
								message: "请输入密码",
							},
							{
								min: 6,
								message: "必须大于6位",
							},
							{
								max: 12,
								message: "必须小于12位",
							},
							{
								validator: validateToNextPassword,
							},
						],
					})(<Input.Password />)}
				</Form.Item>
				<Form.Item label="确认密码" hasFeedback>
					{getFieldDecorator("confirm", {
						rules: [
							{
								required: true,
								message: "请确认密码",
							},
							{
								validator: compareToFirstPassword,
							},
						],
					})(<Input.Password onBlur={handleConfirmBlur} />)}
				</Form.Item>
				<div className="register-button">
					<Button htmlType="submit">注册</Button>
				</div>
			</Form>
		</>
	);
}

const WrappedRegistrationForm = Form.create({ name: "register" })(Register);

const mapStateToProps = (state: CombinedState) => state.profile;

export default connect(mapStateToProps, profileDispatchAction)(WrappedRegistrationForm);

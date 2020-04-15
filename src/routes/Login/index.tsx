import React, { PropsWithChildren, useEffect } from "react";
import { Form, Input, Button, Icon, message } from "antd";
import { CombinedState } from "@/typings/state";
import { connect } from "react-redux";
import profileDispatchAction, { mapDispatchToProps } from "@/store/actions/profile";
import { RouteComponentProps, Link } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form";
import Nav from "@/components/Nav";
import "./index.less";
import logo from "@/assets/images/logo.jpg";
import { useDomWithKeySolve } from "@/components/hooks/useDomWithKeySolve";
type Props = PropsWithChildren<
	RouteComponentProps &
		ReturnType<typeof mapStateToProps> &
		mapDispatchToProps &
		FormComponentProps
>;

function Login(props: Props) {
	const { getFieldDecorator } = props.form;
	useDomWithKeySolve(
		"ant-form",
		parseFloat(document.documentElement.style.fontSize) * 1.2,
		parseFloat(document.documentElement.style.fontSize) * 2
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.form.validateFieldsAndScroll((errors: any, values) => {
			if (errors) {
				message.error("登录失败");
			} else {
				props.login(values);
			}
		});
	};
	useEffect(() => {
		if (props.loginState == "LOGINED") {
			props.history.push("/profile");
		}
	}, []);
	return (
		<>
			<Nav history={props.history}>用户登录</Nav>

			<Form onSubmit={handleSubmit} className="login-form">
				<div className="logo">
					<img src={logo}></img>
				</div>

				<Form.Item>
					{getFieldDecorator("email", {
						rules: [
							{ required: true, message: "请输入邮箱" },
							{
								type: "email",
								message: "必须是邮箱格式",
							},
						],
					})(
						<Input
							prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder="请输入邮箱"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator("password", {
						rules: [
							{ required: true, message: "请输入密码" },
							{ max: 12, message: "密码长度不超过12位" },
							{ min: 6, message: "密码长度不小于6位" },
						],
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
							type="password"
							placeholder="请输入密码"
						/>
					)}
				</Form.Item>
				<Form.Item>
					<div className="login-form-link">
						<Link to="/register">现在注册</Link>
						<Link to="/profileforget">忘记密码</Link>
					</div>
				</Form.Item>
				<div>
					<Button htmlType="submit" className="login-form-button">
						登录
					</Button>
				</div>
			</Form>
		</>
	);
}

const WrappedRegistrationForm = Form.create({ name: "register" })(Login);

const mapStateToProps = (state: CombinedState) => state.profile;

export default connect(mapStateToProps, profileDispatchAction)(WrappedRegistrationForm);

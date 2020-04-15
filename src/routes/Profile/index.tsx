import React, { PropsWithChildren, useEffect } from "react";
import "./index.less";
import { RouteComponentProps, Link } from "react-router-dom";
import { connect } from "react-redux";
import { CombinedState, ProfileState, LOGIN_TYPE } from "@/typings/";
import profileDispatchAction, { mapDispatchToProps } from "@/store/actions/profile";
import Nav from "@/components/Nav";
import { Button, Alert, Icon, Avatar } from "antd";
import logo from "@/assets/images/logo.jpg";
import ProfileCollection from "./component/ProfileCollection";

type Props = PropsWithChildren<
	RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps
>;

function Profile(props: Props) {
	useEffect(() => {
		props.validate();
	}, []);
	let content;
	if (props.loginState === LOGIN_TYPE.UN_VALIDATE) {
		content = null;
	} else if (props.loginState == LOGIN_TYPE.LOGINED && props.user) {
		content = (
			<>
				<div className="user-info">
					<Avatar src={props.user.avatar ? props.user.avatar : logo} />
					<div className="user-textarea">
						<div>
							<span>{props.user.username}</span>
						</div>
						<div>
							<span>{props.user.email}</span>
						</div>
					</div>
					<div className="user-viewport">
						<div>
							<Link to="/profileedit" id="editurl">
								<Icon type="edit" key="edit" /> 编辑信息
							</Link>
						</div>
						<div onClick={() => props.logout()} key="export">
							<Icon type="export" key="export" /> 退出登录
						</div>
					</div>
				</div>
				<ProfileCollection></ProfileCollection>
			</>
		);
	} else {
		content = (
			<div className="user-unlogin">
				<div className="unloginbox">
					<Alert type="warning" message="未登录" description="请登录后操作"></Alert>
					<div className="unlogin-button">
						<Button>
							<Link to="/login">登录</Link>
						</Button>
						<Button>
							<Link to="/register">注册</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}
	return (
		<section style={{ height: "100%" }}>
			<Nav history={props.history}>个人中心</Nav>
			{content}
		</section>
	);
}
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

export default connect(mapStateToProps, profileDispatchAction)(Profile);

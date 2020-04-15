import React, { PropsWithChildren, useState } from "react";
import Nav from "@/components/Nav";
import { RouteComponentProps } from "react-router-dom";
import { mapDispatchToProps } from "@/store/actions/profile";
import { CombinedState, ProfileState } from "@/typings/";
import "./index.less";
import profileDispatchAction from "@/store/actions/profile";
import { connect } from "react-redux";
import { Button, message } from "antd";

type Props = PropsWithChildren<
	RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps
>;
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

function handleSubmit() {
	message.info("自行完成后续逻辑");
}

function ProfileForget(props: Props) {
	const [value, setValue] = useState("");

	return (
		<>
			<Nav history={props.history}>忘记密码</Nav>
			<div className="profile-forget">
				<div className="profile-main">
					<input
						type="text"
						onChange={(e) => {
							setValue(e.target.value);
						}}
						value={value}
						placeholder={"请输入要找回的账号名"}
					/>
					<Button onClick={handleSubmit}>提交</Button>
				</div>
			</div>
		</>
	);
}

export default connect(mapStateToProps, profileDispatchAction)(ProfileForget);

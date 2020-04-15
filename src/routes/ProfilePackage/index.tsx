import React, { PropsWithChildren } from "react";
import Nav from "@/components/Nav";
import { RouteComponentProps } from "react-router-dom";
import { mapDispatchToProps } from "@/store/actions/profile";
import { CombinedState, ProfileState } from "@/typings/";
import "./index.less";
import profileDispatchAction from "@/store/actions/profile";
import { connect } from "react-redux";
import { Alert } from "antd";

type Props = PropsWithChildren<
	RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps
>;
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

function ProfilePackage(props: Props) {
	return (
		<>
			<Nav history={props.history}>我的包裹</Nav>
			<div className="profilePackage">
				<Alert message={"您还没有包裹"}></Alert>
			</div>
		</>
	);
}

export default connect(mapStateToProps, profileDispatchAction)(ProfilePackage);

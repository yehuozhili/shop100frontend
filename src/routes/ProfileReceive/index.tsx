/* eslint-disable prefer-const */
import React, { PropsWithChildren, useState, useEffect } from "react";
import Nav from "@/components/Nav";
import { RouteComponentProps } from "react-router-dom";
import { mapDispatchToProps } from "@/store/actions/profile";
import { CombinedState, ProfileState } from "@/typings/";
import "./index.less";
import profileDispatchAction from "@/store/actions/profile";
import { connect } from "react-redux";
import { FormComponentProps } from "antd/lib/form";
import { Button } from "antd";

type Props = PropsWithChildren<
	RouteComponentProps &
		ReturnType<typeof mapStateToProps> &
		mapDispatchToProps &
		FormComponentProps
>;
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

function ProfileReceive(props: Props) {
	const [checkBox, setCheckBox] = useState<Array<boolean>>([]);
	useEffect(() => {
		if (!props.user) {
			props.history.push("/profile");
		}
	}, []);
	useEffect(() => {
		if (props.user) {
			const arr = props.user.receive.map((item) => item.checked);
			setCheckBox(arr);
		}
	}, [props.user]);

	const changeChecked = (index: number) => {
		if (!props.checkedLoading) {
			const value = !checkBox[index];

			if (value) {
				let arr = checkBox.fill(false);
				arr[index] = value;
				setCheckBox([...arr]);
				if (props.user) {
					props.profileUpdateAdress(props.user.receive, arr);
				}
			} else {
				let arr = checkBox;
				arr[index] = value;
				setCheckBox([...arr]);
				if (props.user) {
					props.profileUpdateAdress(props.user.receive, arr);
				}
			}
		}
	};
	const deltAdress = (index: number) => {
		if (!props.checkedLoading && props.user) {
			const arr = JSON.parse(JSON.stringify(props.user.receive));
			arr.splice(index, 1);
			props.profileUpdateAdress(arr);
		}
	};
	return (
		<>
			<Nav history={props.history}>我的地址簿</Nav>
			<div className="profile-receive-container">
				<div className="profile-receive-maincontrol">
					{props.user &&
						props.user.receive.map((item, index: number) => {
							return (
								<div key={index} className="profile-receive-item">
									<div className="profile-receive-checkbox">
										<input
											type="checkbox"
											onChange={() => changeChecked(index)}
											checked={checkBox[index] ? checkBox[index] : false}
											id={"checkbox" + index}
										/>
										<label htmlFor={"checkbox" + index}>设为默认</label>
									</div>
									<div className="profile-receive-title">
										<span className="profile-receive-name">{item.name}</span>
										<span>{item.phoneNumber}</span>
										<div>
											<span className="profile-receive-distinct">
												{item.distinct}
											</span>
											<span>{item.distinctDetail}</span>
										</div>
									</div>
									<div className="profile-receive-button">
										<Button onClick={() => deltAdress(index)}>删除</Button>
									</div>
								</div>
							);
						})}
					<div
						className="addbutton"
						onClick={() => props.history.push("/profilereceiveadd")}
					>
						添加地址
					</div>
				</div>
			</div>
		</>
	);
}

export default connect(mapStateToProps, profileDispatchAction)(ProfileReceive);

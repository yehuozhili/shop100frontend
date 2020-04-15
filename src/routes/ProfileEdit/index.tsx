import React, { PropsWithChildren, useState, useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import { RouteComponentProps } from "react-router-dom";
import { mapDispatchToProps } from "@/store/actions/profile";
import { CombinedState, ProfileState } from "@/typings/";
import "./index.less";
import profileDispatchAction from "@/store/actions/profile";
import { connect } from "react-redux";
import SpliceUpload from "@/components/Upload";
import { Button, message, Icon } from "antd";
import logo from "@/assets/images/logo.jpg";

type Props = PropsWithChildren<
	RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps
>;
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

function validateFile(file: File | undefined) {
	if (!file) {
		message.error("未选择图片");
		return false;
	}
	const isValideType = ["image/jpeg", "image/png", "image/gif"].includes(file.type);
	if (!isValideType) {
		message.error("不支持的图片类型");
	}
	const isValideDate = file.size < 1024 * 1024 * 2;
	if (!isValideDate) {
		message.error("上传图片不超过2mb");
	}
	return isValideType && isValideDate;
}

function ProfileEdit(props: Props) {
	const UploadRef = useRef<HTMLButtonElement>(null);
	const [inputValue, setInputValue] = useState("");
	const [avatar, setAvatar] = useState(<Icon type="upload"></Icon>);
	useEffect(() => {
		props.validate();
	}, []);
	useEffect(() => {
		if (props.user) {
			const img = <img src={props.user.avatar ? props.user.avatar : logo}></img>;
			setAvatar(img);
			setInputValue(props.user.username);
		}
	}, [props.user]);
	const handleSubmit = () => {
		if (UploadRef.current) UploadRef.current.click();
	};
	const uploadRequest = (file: File | undefined) => {
		if (file) {
			const formData = new FormData();
			formData.append("avatar", file);
			props.changeAvatar(formData);
		}
	};
	const changeUsername = () => {
		props.changeUserName(inputValue);
	};
	return (
		<>
			<Nav history={props.history}>编辑信息</Nav>
			<div className="edit-profile">
				<div className="edit-profile-avatar">
					<div>修改头像：</div>
					<SpliceUpload
						validateFile={validateFile}
						img={avatar}
						uploadRequest={uploadRequest}
						ref={UploadRef}
					></SpliceUpload>
					<Button onClick={handleSubmit}>确认修改</Button>
				</div>
				<div className="edit-profile-username">
					<div>修改用户名：</div>
					<input
						type="text"
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value);
						}}
					/>
					<Button onClick={changeUsername}>确认修改</Button>
				</div>
			</div>
		</>
	);
}

export default connect(mapStateToProps, profileDispatchAction)(ProfileEdit);

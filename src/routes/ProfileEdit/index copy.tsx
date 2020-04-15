// import React, { PropsWithChildren, useState, useEffect } from "react";
// import Nav from "@/components/Nav";
// import { RouteComponentProps } from "react-router-dom";
// import { mapDispatchToProps } from "@/store/actions/profile";
// import { CombinedState, ProfileState } from "@/typings/";
// import { Upload, Icon, message, Form, Input, Button } from "antd";
// import { UploadChangeParam, RcFile } from "antd/lib/upload/interface";
// import "./index.less";
// import profileDispatchAction from "@/store/actions/profile";
// import { connect } from "react-redux";
// import { FormComponentProps } from "antd/lib/form";
// import { BASEURL } from "@/env";
// type Props = PropsWithChildren<
// 	RouteComponentProps &
// 		ReturnType<typeof mapStateToProps> &
// 		mapDispatchToProps &
// 		FormComponentProps
// >;
// const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

// function getBase64(img: File | Blob | undefined, callback: any) {
// 	const reader = new FileReader();
// 	reader.addEventListener("load", () => callback(reader.result));
// 	if (img) {
// 		reader.readAsDataURL(img);
// 	}
// }

// function ProfileEdit(props: Props) {
// 	useEffect(() => {
// 		props.validate();
// 	}, []);

// 	const uploadUrl = BASEURL + "user/uploadAvatar";
// 	const [responseUrl, setResponseUrl] = useState();
// 	const [loading, setLoading] = useState(false);
// 	const [imageUrl, setImageUrl] = useState(props.user?.avatar);
// 	const handleChange = (info: UploadChangeParam) => {
// 		if (info.file.status === "uploading") {
// 			setLoading(true);
// 			return;
// 		}
// 		if (info.file.status === "done") {
// 			getBase64(info.file.originFileObj, (imageUrl: string | ArrayBuffer | null) => {
// 				if (info.file.response.success) {
// 					setImageUrl(imageUrl as string);
// 					setResponseUrl(info.file.response.data);
// 					setLoading(false);
// 				} else {
// 					setLoading(false);
// 				}
// 			});
// 		}
// 	};
// 	const uploadButton = (
// 		<div>
// 			<Icon type={loading ? "loading" : "plus"} />
// 			<div className="ant-upload-text">Upload</div>
// 		</div>
// 	);
// 	const beforeUpload = (file: RcFile) => {
// 		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
// 		if (!isJpgOrPng) {
// 			message.error("只可以上传 JPG/PNG 图片格式!");
// 		}
// 		const isLt2M = file.size / 1024 / 1024 < 1;
// 		if (!isLt2M) {
// 			message.error("图片必须小于 1MB!");
// 		}
// 		return isJpgOrPng && isLt2M;
// 	};
// 	const { getFieldDecorator } = props.form;

// 	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		props.form.validateFieldsAndScroll((err, values) => {
// 			if (!err) {
// 				values.responseUrl = responseUrl;
// 				values.id = props.user?.id;
// 				console.log(props.editAvatar);
// 				props.editAvatar(values);
// 			}
// 		});
// 	};
// 	useEffect(() => {
// 		props.form.setFieldsValue({ username: props.user?.username });
// 	}, []);

// 	return (
// 		<>
// 			<Nav history={props.history}>编辑信息</Nav>
// 			<div className="edit-profile">
// 				<Form onSubmit={handleSubmit}>
// 					<div className="edit-head">
// 						<div className="ant-col ant-form-item-label">
// 							<label className="edit-head-label">修改头像</label>
// 						</div>
// 						<Upload
// 							name="avatar"
// 							listType="picture-card"
// 							className="avatar-uploader"
// 							showUploadList={false}
// 							action={uploadUrl}
// 							onChange={handleChange}
// 							beforeUpload={beforeUpload}
// 						>
// 							{imageUrl ? (
// 								<img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
// 							) : (
// 								uploadButton
// 							)}
// 						</Upload>
// 					</div>
// 					<Form.Item label="修改用户名:">
// 						{getFieldDecorator("username", {
// 							rules: [
// 								{
// 									max: 12,
// 									message: "必须小于12位"
// 								}
// 							]
// 						})(<Input />)}
// 					</Form.Item>
// 					<div className="submitbtn">
// 						<Button htmlType="submit">提交</Button>
// 					</div>
// 				</Form>
// 			</div>
// 		</>
// 	);
// }

// const WrappedRegistrationForm = Form.create()(ProfileEdit);

// export default connect(mapStateToProps, profileDispatchAction)(WrappedRegistrationForm);

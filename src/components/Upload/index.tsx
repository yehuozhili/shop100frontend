import React, { useState, useRef, useEffect, forwardRef } from "react";
import "./index.less";

interface Props {
	validateFile: (file: File | undefined) => boolean;
	uploadRequest: (file: File | undefined) => void;
	img: any;
}

function Upload(props: Props, ref: any) {
	const [currentFile, setCurrentFile] = useState<File>();
	const [objectURL, setObjectURL] = useState<string>();
	const fileRef = useRef<HTMLInputElement>(null);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			setCurrentFile(file);
		}
	};
	const handleUpload = () => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	};
	const handleSubmit = () => {
		if (!props.validateFile(currentFile)) return;
		props.uploadRequest(currentFile);
	};
	useEffect(() => {
		if (currentFile) {
			const reader = new FileReader();
			reader.addEventListener("load", () => setObjectURL(reader.result as string));
			reader.readAsDataURL(currentFile);
		}
	}, [currentFile]);
	return (
		<div className="spliceupload">
			<input type="file" onChange={handleChange} ref={fileRef} style={{ display: "none" }} />
			<div className="uploadicon" onClick={handleUpload}>
				{!objectURL && props.img}
				{
					//有url显示图片
					objectURL && (
						<img src={objectURL} style={{ width: "100%", height: "100%" }}></img>
					)
				}
			</div>
			<button onClick={handleSubmit} ref={ref} style={{ display: "none" }}>
				{" "}
				提交
			</button>
		</div>
	);
}

export default forwardRef(Upload);

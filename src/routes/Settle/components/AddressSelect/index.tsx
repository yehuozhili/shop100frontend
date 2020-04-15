import React from "react";
import { createPortal } from "react-dom";
import { UserReceive } from "@/typings";
import { Button } from "antd";
import "./index.less";

interface Props {
	display: boolean;
	setState: (value: React.SetStateAction<boolean>) => void;
	callbackFunc: (index: number) => void;
	displayData: UserReceive[];
}

function AddressSelect(props: Props) {
	return createPortal(
		<>
			<div className="address-selector" style={{ display: props.display ? "" : "none" }}>
				{props.displayData.map((item, index) => {
					return (
						<div className="address-selector-item" key={index}>
							<div className="address-selector-main">
								<div>
									<span>{item.name}</span> <span>{item.phoneNumber}</span>
								</div>
								<div>{item.distinct}</div>
								<div>{item.distinctDetail}</div>
							</div>
							<div>
								<Button
									onClick={() => {
										props.callbackFunc(index);
										props.setState(false);
									}}
								>
									选择
								</Button>
							</div>
						</div>
					);
				})}
			</div>
			<div
				className="mask"
				style={{ display: props.display ? "" : "none" }}
				onClick={() => props.setState(false)}
			></div>
		</>,
		document.body
	);
}

export default AddressSelect;

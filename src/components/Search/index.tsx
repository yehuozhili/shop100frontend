import React, { useRef, useEffect, useState } from "react";
import "./index.less";
import { Button, Icon } from "antd";
type Props = {
	searchCallback: (e: string) => void;
	toSearchQuery: Array<string>;
	resultListFunc: (e: string) => void;
};
function Search(props: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [composeInput, setComposeInput] = useState<boolean>(false);
	const [ulVisible, setUlVisible] = useState<boolean>(false);
	const [hans, setHans] = useState<string>("");
	const inputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!ulVisible) setUlVisible(true);
		if (!composeInput) {
			props.searchCallback(e.target.value);
		}
	};
	const inputHas = (e: string | null) => {
		if (e) {
			props.searchCallback(e);
		}
	};
	const composeStart = () => {
		setComposeInput(true);
	};
	const composeEnd = (e: Event) => {
		setComposeInput(false);
		if (e.target) {
			const inputTarget = (e.target as unknown) as HTMLInputElement;
			setHans(inputTarget.value);
		}
	};
	useEffect(() => {
		inputHas(hans);
	}, [hans]);
	const ulClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
		const value = (e.target.textContent as unknown) as string;
		const tagName = e.target.tagName as string;
		if (inputRef.current && tagName !== "UL") inputRef.current.value = value;
		setUlVisible(false);
	};
	const returnResult = () => {
		if (ulVisible) setUlVisible(false);
		if (inputRef.current) {
			props.resultListFunc(inputRef.current.value);
		}
	};
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.addEventListener("compositionstart", composeStart);
			inputRef.current.addEventListener("compositionend", composeEnd);
		}
		return () => {
			if (inputRef.current) {
				inputRef.current.removeEventListener("compositionstart", composeStart);
				inputRef.current.removeEventListener("compositionend", composeEnd);
			}
		};
	}, []);
	return (
		<>
			<div className="search-head">
				<div className="search-input">
					<Icon type="search"></Icon>
					<input ref={inputRef} type="text" onChange={inputchange} />
				</div>
				<Button onClick={returnResult}>搜索</Button>
			</div>
			{ulVisible && (
				<div className="search-list">
					<ul onClick={ulClick}>
						{props.toSearchQuery &&
							props.toSearchQuery.map((item: string, index: number) => {
								return <li key={item + index}>{item}</li>;
							})}
					</ul>
					<div className="stand"></div>
				</div>
			)}
		</>
	);
}
export default Search;

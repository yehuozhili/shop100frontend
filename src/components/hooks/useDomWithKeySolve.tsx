import { useState, useEffect } from "react";
import { useKeyBoardSolve } from "./useKeyboard";

export function useDomWithKeySolve(domClasssName: string, diffence: number, fixdiffrence: number) {
	const [domargs, setdomargs] = useState({
		height: 0,
		bottom: 0,
	});
	useEffect(() => {
		const targetDom = document.querySelector<HTMLFormElement>(`.${domClasssName}`);
		const height = targetDom?.getBoundingClientRect().height || 0;
		const bottom = targetDom?.getBoundingClientRect().bottom || 0;
		targetDom &&
			setdomargs({
				height,
				bottom,
			});
	}, []);
	useKeyBoardSolve(`${domClasssName}`, domargs, diffence, fixdiffrence);
}

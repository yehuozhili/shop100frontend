import React, { PropsWithChildren, useEffect, useState } from "react";
import "./index.less";
import Nav from "@/components/Nav";
import { RouteComponentProps } from "react-router";
import SearchHead from "@/components/Search";
import { CombinedState, SearchState, Product } from "@/typings";
import { connect } from "react-redux";
import searchDispatchAction, { mapDispatchToProps } from "@/store/actions/search";
import pinyin from "chinese-to-pinyin";
import { Link } from "react-router-dom";
type Props = PropsWithChildren<RouteComponentProps & mapDispatchToProps & SearchState>;

interface QueryState {
	pinyin: Array<string>;
	szm: Array<string>;
	hz: Array<string>;
}
const convertQuery = (e: string, queryMatch: QueryState) => {
	// eslint-disable-next-line prefer-const
	let fiIndexArr: Array<number> = [];
	const reg = RegExp(e);
	queryMatch.pinyin.forEach((item: string, index: number) => {
		if (reg.exec(item)) {
			fiIndexArr.push(index);
		}
	});
	queryMatch.szm.forEach((item: string, index: number) => {
		if (reg.exec(item)) {
			fiIndexArr.push(index);
		}
	});
	queryMatch.hz.forEach((item: string, index: number) => {
		if (reg.exec(item)) {
			fiIndexArr.push(index);
		}
	});
	const fi = Array.from(new Set(fiIndexArr));
	const data = fi.map((item) => {
		return queryMatch.hz[item];
	});
	return data;
};
function Search(props: Props) {
	const [toSearchQuery, setToSearchQuery] = useState<Array<string>>([]);
	const [queryMatch, setQueryMatch] = useState<QueryState>({
		pinyin: [],
		szm: [],
		hz: [],
	});
	const searchCallback = (e: string) => {
		if (e !== "") {
			const data = convertQuery(e, queryMatch);
			setToSearchQuery(data);
		} else {
			setToSearchQuery([]);
		}
	};
	const resultListFunc = (e: string) => {
		//如果是英文，对字典匹配成汉字全称，给后端
		//如果是汉字，直接查询。
		const reg = /[a-zA-Z].*/;
		if (reg.exec(e)) {
			const data = convertQuery(e, queryMatch);
			props.searchProduct(data);
		} else {
			props.searchProduct(e);
		}
	};

	useEffect(() => {
		if (props.productFullName.length <= 0) {
			props.getFullName();
		}
	}, []);
	useEffect(() => {
		if (props.productFullName) {
			const pinyinArr: Array<string> = props.productFullName.map((item: string) => {
				return pinyin(item, { removeTone: true, removeSpace: true, keepRest: true });
			});
			const szmArr: Array<string> = props.productFullName.map((item: string) => {
				return pinyin(item, {
					removeTone: true,
					removeSpace: true,
					keepRest: true,
					firstCharacter: true,
				});
			});
			setQueryMatch({
				pinyin: pinyinArr,
				szm: szmArr,
				hz: props.productFullName,
			});
		}
	}, [props.productFullName]);
	return (
		<>
			<Nav history={props.history}>搜索商品</Nav>
			<SearchHead
				searchCallback={searchCallback}
				toSearchQuery={toSearchQuery}
				resultListFunc={resultListFunc}
			></SearchHead>
			<div className="search-mid">搜索结果:</div>
			<ul className="search-result">
				{props.searchList.map((item: Product) => {
					return (
						<li key={item.id}>
							<Link
								key={item.id}
								to={{
									pathname: `/productdetail/${item.id}`,
								}}
							>
								<img src={item.poster} />
								<div className="search-item-title">
									<div>{item.title}</div>
									<div>￥{item.price}</div>
									<div className="search-item-tag">标签：{item.category}</div>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}

const mapStateToProps = (state: CombinedState) => state.search;

export default connect(mapStateToProps, searchDispatchAction)(Search);

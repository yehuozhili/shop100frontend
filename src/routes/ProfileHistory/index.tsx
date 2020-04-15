import React, { PropsWithChildren, useEffect } from "react";
import Nav from "@/components/Nav";
import { RouteComponentProps } from "react-router-dom";
import { mapDispatchToProps } from "@/store/actions/profile";
import { CombinedState, ProfileState, UserHistory } from "@/typings/";
import "./index.less";
import profileDispatchAction from "@/store/actions/profile";
import { connect } from "react-redux";
import Virtualize from "@/components/Virtualize";

type Props = PropsWithChildren<
	RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps
>;
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

function ProfileHistory(props: Props) {
	useEffect(() => {
		props.getHistoryDetail();
	}, []);
	return (
		<>
			<Nav history={props.history}>我的浏览历史</Nav>
			<div className="profile-history">
				<Virtualize
					itemHeight={1.43 * parseFloat(document.documentElement.style.fontSize)}
					columnNumber={1}
					insightNumber={9}
					scrollDom={document.querySelector(".profile-history")}
					startHeight={0.2 * parseFloat(document.documentElement.style.fontSize)}
					scaleRow={4}
				>
					{props.renderHistory.map((item: UserHistory) => {
						return (
							<div className="profile-history-item" key={item.date}>
								<img src={item.id.poster} />
								<div className="profile-collect-text">
									<div>{item.id.title}</div>
									<div>{item.id.price}</div>
								</div>

								<div>
									<div>{new Date(item.date).toLocaleString()}</div>
								</div>
							</div>
						);
					})}
				</Virtualize>
			</div>
		</>
	);
}

export default connect(mapStateToProps, profileDispatchAction)(ProfileHistory);

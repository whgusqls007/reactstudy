/* eslint-disable */

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [posts, setPosts] = useState([
		"남자 코트 추천",
		"강남 고기 맛집",
		"파이썬 독학",
	]);

	const [like, setLike] = useState(0);

	const [viewModal, setViewModal] = useState(
		posts.map(() => {
			return false;
		})
	);

	const [title, setTitle] = useState("");

	return (
		<div className="App">
			<div className="black-nav">
				<div>개발 blog</div>
			</div>
			{posts.map((title, i) => {
				return (
					<>
						<List
							key={title}
							title={title}
							index={i}
							viewModal={viewModal}
							setViewModal={setViewModal}
						/>
						<div className="container" key={i}>
							{viewModal[i] === true ? (
								<Modal title={title} index={i} key={title} />
							) : null}
						</div>
					</>
				);
			})}

			<div className="publish">
				<input
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						if (title != "") {
							let temp = [...posts];
							temp.unshift(title);
							setPosts(temp);
							setViewModal(
								posts.map(() => {
									return false;
								})
							);
						}
					}}
				>
					저장
				</button>
			</div>
		</div>
	);
}

const List = (props) => {
	return (
		<div className="list">
			<h3
				onClick={() => {
					let temp = [...props.viewModal];
					if (temp[props.index] === false) {
						temp[props.index] = true;
						props.setViewModal(temp);
					} else {
						temp[props.index] = false;
						props.setViewModal(temp);
					}
				}}
			>
				{props.title}
			</h3>
			<p>2월 17일 발행</p>
			<hr />
		</div>
	);
};

const Modal = (props) => {
	return (
		<div className="modal">
			<h2>{props.title}</h2>
			<p>날짜</p>
			<p>상세내용</p>
		</div>
	);
};

export default App;

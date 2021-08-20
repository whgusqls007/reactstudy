/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./App.css";
import Data from "./data";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";

const App = () => {
	const [shoese, setShoese] = useState(Data);

	return (
		<div className="App">
			<MyNavbar />
			<Switch>
				<Route exact path="/">
					<MainPageComponent shoese={shoese} />
				</Route>
				<Route exact path="/detail/:id">
					<DetailPageComponent shoese={shoese} />
				</Route>
			</Switch>
		</div>
	);
};

const DetailPageComponent = (props) => {
	const history = useHistory();
	const { id } = useParams();
	const shoes = props.shoese.find((items) => {
		return items.id == id;
	});
	const [viewAlert, setViewAlert] = useState(true);

	useEffect(() => {
		// 마운트
		let timer = setTimeout(() => {
			console.log("set timer");
			setViewAlert(false);
		}, 2000);

		// 언마운트
		return () => {
			console.log("unset timer");
			clearTimeout(timer);
		};
	}, []);
	return (
		<div className="container">
			{viewAlert === true ? <div>재고 얼마 없음</div> : null}
			<div className="row">
				<div className="col-md-6">
					<img
						src={`https://codingapple1.github.io/shop/shoes${
							shoes.id + 1
						}.jpg`}
						width="100%"
					/>
				</div>
				<div className="col-md-6 mt-4">
					<h4 className="pt-5">{shoes.title}</h4>
					<p>{shoes.content}</p>
					<p>{shoes.price}</p>
					<button className="btn btn-danger">주문하기</button>
					<button
						className="btn btn-primary"
						onClick={() => {
							history.goBack();
						}}
					>
						뒤로가기
					</button>
				</div>
			</div>
		</div>
	);
};

const MainPageComponent = (props) => {
	return (
		<>
			<MyJumbotron />
			<div className="container">
				<div className="row">
					{props.shoese.map((data, i) => {
						return <Item i={i} data={data} key={i} />;
					})}
				</div>
			</div>
		</>
	);
};

const MyNavbar = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/detail">
							Detail
						</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">
								Action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">
								Something
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

const MyJumbotron = () => {
	return (
		<div className="jumbotron jumboBackground">
			<h1>20% Season Off</h1>
			<p>
				This is a simple hero unit, a simple jumbotron-style component
				for calling extra attention to featured content or information.
			</p>
			<p>
				<Button variant="primary">Learn more</Button>
			</p>
		</div>
	);
};

const Item = (props) => {
	return (
		<div className="col-md-4">
			<img
				src={`https://codingapple1.github.io/shop/shoes${
					props.i + 1
				}.jpg`}
				width="100%"
			/>
			<h4>{props.data["title"]}</h4>
			<p>
				{props.data["content"]} & {props.data["price"]}
			</p>
		</div>
	);
};

export default App;

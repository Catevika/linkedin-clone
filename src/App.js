import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import { connect } from "react-redux";
import { getUserAuth } from "./actions";

function App() {
	useEffect(() => {
		getUserAuth();
	}, []);

	return (
		<div>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Login />
					</Route>
					<Route path='/home'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

const mapsStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => ({
	getUserAuth: () => dispatch(getUserAuth())
});

export default connect(mapsStateToProps, mapDispatchToProps)(App);

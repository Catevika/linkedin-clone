import styled from "styled-components";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signInAPI } from "../actions";

const Login = ({ signIn, user }) => {
	return (
		<Container>
			{user ? <Redirect to='/home' /> : <Redirect to='/' />}
			<Nav>
				<div className='link'>
					<img src='/images/login-logo.svg' alt='Linkedin login logo' />
				</div>
				<div>
					<Join>Join now</Join>
					<SignIn>Sign In</SignIn>
				</div>
			</Nav>
			<Section>
				<Hero>
					<h1>Welcome to your professional community</h1>
					<img
						src='/images/login-hero.svg'
						alt='A mother and her son, sitting behind their computers at a table in the living room'
					/>
				</Hero>
				<Consent>
					<p>
						{" "}
						<strong>PRIVACY RULES</strong>
					</p>
					<p>
						<strong>Before Signing-in</strong>, please <strong>read</strong> the
						following lines <strong>carefully</strong>:
					</p>
					<ul>
						<li>
							By clicking the <strong>Sign-in with Google</strong> button below,
							you <strong>implicitly consent</strong> to give access to{" "}
							<strong>some</strong> of your{" "}
							<strong>personal information.</strong>
						</li>
						<li>
							The aim of this consent is only to <strong>display</strong> your
							profile <strong>username</strong>,<strong> email</strong> and{" "}
							<strong>photo</strong>, on the <strong>HOME PAGE</strong> and its{" "}
							<strong>POSTS</strong> if you create any.
						</li>
						<li>
							These<strong> information</strong> are{" "}
							<strong>only available during the time you are signed in.</strong>
						</li>
						<li>
							You can <strong>revoke</strong> your{" "}
							<strong>authorization</strong> anytime by going to your{" "}
							<strong>Google account</strong>, selecting{" "}
							<strong>security</strong> then{" "}
							<strong>third party applications</strong>. Find{" "}
							<strong>LinkedIn clone</strong>, click on it then on the{" "}
							<strong>remove access button</strong>.
						</li>
						<li>
							<strong>Once on the home page</strong>, you can{" "}
							<strong>sign out anytime</strong> by hovering over your profile
							picture in the navigation bar and selecting the sign out option.
						</li>
						<li>
							If you <strong>agree</strong> with the above mentioned, you can
							now <strong>Sign-in</strong>!
						</li>
					</ul>
				</Consent>
				<Thanks>
					<p>
						<strong>Thank you </strong>and enjoy your discovery of this{" "}
						<strong>Linkedin Clone</strong>
					</p>{" "}
					<p>
						made with 💖 by <strong>Catevika</strong> with the great help of{" "}
						<strong>Clever Programmer!</strong>
					</p>
				</Thanks>
				<Form>
					<Google onClick={() => signIn()}>
						<img src='/images/google.svg' alt='Google logo' />
						<p> Sign In with Google</p>
					</Google>
				</Form>
			</Section>
		</Container>
	);
};

const Container = styled.div`
	padding: 0;
`;
const Nav = styled.nav`
	position: relative;
	display: flex;
	justify-content: space-between;
	flex-wrap: nowrap;
	align-items: center;
	max-width: 1128px;
	margin: auto;
	padding: 12px 0 16px;

	& > .link {
		height: 34px;
		width: 135px;

		@media (max-width: 768px) {
			padding: 0 5px;
		}
	}
`;

const Join = styled.a`
	font-size: 16px;
	margin-right: 12px;
	padding: 10px 12px;
	border-radius: 4px;
	color: rgba(0 0 0 / 60%);

	&:hover {
		background-color: rgba(0 0 0 / 8%);
		color: rgba(0 0 0 / 9%);
	}
`;

const SignIn = styled.a`
	font-size: 16px;
	font-weight: 600;
	line-height: 40px;
	text-align: center;
	padding: 10px 24px;
	border-radius: 24px;
	color: #0a66c2;
	background-color: rgba(0, 0, 0, 0);
	box-shadow: inset 0 0 0 1px #0a66c2;
	transition-duration: 167ms;

	&:hover {
		background-color: rgba(112 181 249 / 15%);
	}
`;

const Section = styled.section`
	position: relative;
	align-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	min-height: 700px;
	width: 100%;
	max-width: 1128px;
	margin: auto;
	color: #0a66c2;

	@media (max-width: 768px) {
		margin: auto;
		min-height: 0;
	}
`;

const Hero = styled.div`
	width: 100%;
	h1 {
		font-size: 56px;
		font-weight: 200;
		line-height: 70px;
		width: 55%;
		color: #2977c9;

		@media (max-width: 768px) {
			line-height: 2;
			text-align: center;
			font-size: 20px;
			width: 100%;
		}
	}

	img {
		position: absolute;
		bottom: 30px;
		right: -100px;
		height: 670px;
		width: 600px;

		@media (max-width: 1024px) {
			position: initial;
			top: 230px;
			height: initial;
			width: initial;
		}
	}
`;

const Form = styled.div`
	margin-top: 20px;
	width: 408px;

	@media (max-width: 1024px) {
		width: 100%;
		margin-top: 20px;
	}
`;

const Consent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	max-width: 480px;
	color: #7c1f1f;
	font-weight: 500;
	line-height: 1.5;
	margin: 20px 0;
	border: 2px solid #7c1f1f;
	border-radius: 4px;
	padding: 8px;

	@media (max-width: 1024px) {
		width: 100%;
		margin: 20px auto;
	}

	li {
		list-style: circle;
		margin-left: 20px;
	}
`;

const Thanks = styled.div`
	max-width: 480px;
	text-align: center;
	color: rgba(0 0 0 / 90%);

	@media (max-width: 1024px) {
		width: 100%;
		margin: 20px auto;
	}
`;

const Google = styled.button`
	z-index: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 56px;
	width: 100%;
	font-size: 20px;
	color: rgba(0, 0 0 / 60%);
	background-color: #fff;
	border: 2px solid rgb(0 0 0 / 60%);
	box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
		inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
	border-radius: 28px;
	transition-duration: 167ms;

	&:hover {
		color: rgba(0 0 0 / 75%);
		background-color: rgba(207 207 207 / 25%);
	}

	p {
		margin-left: 8px;
	}
`;

const mapStateToProps = (state) => {
	return {
		user: state.userState.user
	};
};

const dispatchToProps = (dispatch) => ({
	signIn: () => dispatch(signInAPI())
});

export default connect(mapStateToProps, dispatchToProps)(Login);

import styled from "styled-components";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signOutAPI } from "../actions";

const Header = ({ user, signOut }) => {
	return (
		<Container>
			<Content>
				<Logo>
					<Link className='link' to='/home'>
						<img src='/images/home-logo.svg' alt='Linkedin Header logo' />
					</Link>
				</Logo>
				<Search>
					<div>
						<input type='text' placeholder='Search' />
					</div>
					<SearchIcon>
						<img src='/images/search-icon.svg' alt='Search icon' />
					</SearchIcon>
				</Search>
				<Nav>
					<NavListWrap>
						<NavList className='active'>
							<Link className='link' to='/home'>
								<img src='/images/nav-home.svg' alt='Home icon' />
								<span>Home</span>
							</Link>
						</NavList>
						<NavList>
							<div className='link'>
								<img src='/images/nav-network.svg' alt='Network icon' />
								<span>Network</span>
							</div>
						</NavList>
						<NavList>
							<div className='link'>
								<img src='/images/nav-jobs.svg' alt='Jobs icon' />
								<span>Jobs</span>
							</div>
						</NavList>
						<NavList>
							<div className='link'>
								<img src='/images/nav-messaging.svg' alt='Messaging icon' />
								<span>Messaging</span>
							</div>
						</NavList>
						<NavList>
							<div className='link'>
								<img
									src='/images/nav-notifications.svg'
									alt='Notifications icon'
								/>
								<span>Notifications</span>
							</div>
						</NavList>
						<User>
							<div className='link'>
								{user && user.photoURL ? (
									<img src={user.photoURL} alt='User from Google' />
								) : (
									<img src='/images/user.svg' alt='User placeholder' />
								)}
								<span>
									Me
									<img src='/images/down-icon.svg' alt='Down icon' />
								</span>
							</div>
							<SignOut>
								<Link to='/' onClick={signOut()}>
									Sign Out
								</Link>
							</SignOut>
						</User>
						<Work>
							<div className='link'>
								<img src='/images/nav-work.svg' alt='Work icon' />
								<span>
									Work
									<img src='/images/down-icon.svg' alt='Down icon' />
								</span>
							</div>
						</Work>
					</NavListWrap>
				</Nav>
			</Content>
		</Container>
	);
};

const Container = styled.div`
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	background-color: #fff;
	border-bottom: 1px solid rgba(0 0 0 / 8%);
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	margin: 0 auto;
	min-height: 100%;
	max-width: 1128px;
`;

const Logo = styled.span`
	margin-right: 8px;
	font-size: 0;
`;

const Search = styled.div`
	position: relative;
	opacity: 1;
	flex-grow: 1;

	& > div {
		max-width: 280px;

		input {
			height: 34px;
			width: 218px;
			padding: 0 8px 0 40px;
			line-height: 1.75;
			font-size: 14px;
			font-weight: 400;
			border: none;
			border-radius: 2px;
			border-color: #dce6f1;
			box-shadow: none;
			background-color: #eef3f8;
		}
	}
`;

const SearchIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
	position: absolute;
	top: 10px;
	left: 2px;
	width: 40px;
	margin: 0;
	border-radius: 0 2px 2px 0;
	pointer-events: none;
`;

const Nav = styled.div`
	display: block;
	margin-left: auto;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: white;
	}
`;

const NavListWrap = styled.ul`
	display: flex;
	flex-wrap: nowrap;

	.active {
		span:after {
			position: absolute;
			content: "";
			bottom: 0;
			left: 0;
			width: 100%;
			border-bottom: 2px solid var(--white, #fff);
			border-color: rgba(0 0 0 / 90%);
			transform: scaleX(1);
			transition: transform 0.2s ease-in-out;
		}
	}
`;

const NavList = styled.li`
	display: flex;
	align-items: center;

	.link {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 52px;
		min-width: 80px;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
		text-decoration: none;
		background: transparent;

		span {
			display: flex;
			align-items: center;
			color: rgba(0 0 0 / 60%);
		}

		@media (max-width: 768px) {
			min-width: 70px;
		}
	}
	&:hover,
	&:active {
		.link {
			span {
				color: rgba(0 0 0 / 90%);
			}
		}
	}
`;

const SignOut = styled.div`
	position: absolute;
	top: 45px;
	width: 100px;
	height: 40px;
	font-size: 16px;
	background: white;
	text-align: center;
	border-radius: 0 0 5px 5px;
	transition-duration: 167ms;
	display: none;

	@media (max-width: 768px) {
		top: 5px;
		bottom: 45px;
	}
`;

const User = styled(NavList)`
	.link > svg {
		width: 24px;
		border-radius: 50%;
	}

	.link > img {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}

	span {
		display: flex;
		align-items: center;
	}

	&:hover {
		${SignOut} {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

const Work = styled(User)`
	border-left: 1px solid rgba(0 0 0 / 8%);
`;

const mapStateToProps = (state) => {
	return {
		user: state.userState.user
	};
};

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOutAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import styled from "styled-components";

import { connect } from "react-redux";

const Leftside = ({ auth, user }) => {
	return (
		<Container>
			<ArtCard>
				<UserInfo>
					<CardBackground />
					<div className='link'>
						<Photo />
						<Link>Welcome, {auth ? user.displayName : "there"}!</Link>
					</div>
					<div className='link'>
						<AddPhotoText>Add a photo</AddPhotoText>
					</div>
				</UserInfo>
				<Widget>
					<div className='link'>
						<div>
							<span>Connections</span>
							<span>Grow your network</span>
						</div>
						<img src='/images/widget-icon.svg' alt='widget icon' />
					</div>
				</Widget>
				<Item>
					<div className='link'>
						<div>
							<span>
								<img src='/images/item-icon.svg' alt='Item icon' />
								My Items
							</span>
						</div>
					</div>
				</Item>
			</ArtCard>
			<CommunityCard>
				<div className='link'>
					<span>Groups</span>
				</div>
				<div className='link'>
					<span>
						Events
						<img src='/images/plus-icon.svg' alt='' />
					</span>
				</div>
				<div className='link'>
					<span>Follow Hashtags</span>
				</div>
				<div className='link'>
					<span>Discover more</span>
				</div>
			</CommunityCard>
		</Container>
	);
};

const Container = styled.div`
	grid-area: leftside;
`;

const ArtCard = styled.div`
	position: relative;
	overflow: hidden;
	text-align: center;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
	transition: box-shadow 83ms;
`;

const UserInfo = styled.div`
	padding: 12px 12px 16px;
	word-wrap: break-word;
	word-break: break-word;
	border-bottom: 1px solid rgba(0 0 0 / 15%);
`;

const CardBackground = styled.div`
	background: url("/images/card-bg.svg");
	background-position: center;
	background-size: 462px;
	height: 54px;
	margin: -12px -12px 0;
`;

const Photo = styled.div`
	background-image: url("/images/photo.svg");
	box-sizing: border-box;
	-webkit-background-clip: content-box;
	background-clip: content-box;
	background-color: white;
	background-position: center;
	background-size: 60%;
	background-repeat: no-repeat;
	width: 72px;
	height: 72px;
	margin: -38px auto 12px;
	border-radius: 50%;
	border: 2px solid white;
`;

const Link = styled.div`
	font-size: 16px;
	font-weight: 600;
	line-height: 1.5;
	color: rgba(0 0 0 / 90%);
`;

const AddPhotoText = styled.div`
	font-size: 12px;
	font-weight: 400;
	line-height: 1.33;
	margin-top: 4px;
	color: #0a66c2;
`;

const Widget = styled.div`
	padding-top: 12px;
	padding-bottom: 12px;
	border-bottom: 1px solid rgba(0 0 0 / 15%);

	& > .link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4px 12px;

		&:hover {
			background-color: rgba(0 0 0 / 8%);
		}

		div {
			display: flex;
			flex-direction: column;
			text-align: left;

			span {
				font-size: 12px;
				line-height: 1.333;

				&:first-child {
					color: rgba(0 0 0 / 60%);
				}

				&:nth-child(2) {
					color: rgb(0, 0, 0);
				}
			}
		}
	}

	svg {
		color: rgb(0, 0, 0);
	}
`;

const Item = styled.div`
	.link {
		display: block;
		font-size: 12px;
		text-align: left;
		padding: 12px;
		border-color: rgba(0 0 0 / 8%);

		span {
			display: flex;
			align-items: center;
			color: rgb(0, 0, 0);

			svg {
				color: rgba(0 0 0 / 60%);
			}
		}

		&:hover {
			background-color: rgba(0 0 0 / 8%);
		}
	}
`;

const CommunityCard = styled(ArtCard)`
	display: flex;
	flex-direction: column;
	text-align: left;
	padding: 8px 0 0;

	.link {
		font-size: 12px;
		padding: 4px 12px 4px 12px;
		color: black;

		&:hover {
			color: #0a66c2;
		}

		span {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&:last-child {
			padding: 12px;
			color: rgba(0, 0 0 / 60%);
			border-top: 1px solid #d6cec2;

			&:hover {
				background-color: rgba(0 0 0 / 8%);
			}
		}
	}
`;

const mapStateToProps = (state) => {
	return {
		user: state.userState.user
	};
};

export default connect(mapStateToProps)(Leftside);

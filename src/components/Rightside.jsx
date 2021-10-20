import styled from "styled-components";

const Rightside = (props) => {
	return (
		<Container>
			<FollowCard>
				<Title>
					<h2>Add to your feed</h2>
					<img src='/images/feed-icon.svg' alt='' />
				</Title>

				<FeedList>
					<li>
						<div className='link'>
							<Avatar />
						</div>
						<div>
							<span>#Linkedin</span>
							<button>Follow</button>
						</div>
					</li>
					<li>
						<div className='link'>
							<Avatar />
						</div>
						<div>
							<span>#Video</span>
							<button>Follow</button>
						</div>
					</li>
				</FeedList>
				<Recommendation>
					View all recommendations
					<img src='/images/right-icon.svg' alt='' />
				</Recommendation>
			</FollowCard>
			<BannerCard>
				<img
					src='images/jobs.jpg'
					alt='A smiling men with a Your dream job is closer than you think slogan, a See jobs button and the linkedin logo'
				/>
			</BannerCard>
		</Container>
	);
};

const Container = styled.div`
	grid-area: rightside;
`;

const FollowCard = styled.div`
	position: relative;
	overflow: hidden;
	text-align: center;
	margin-bottom: 8px;
	padding: 12px;
	border-radius: 5px;
	background-color: #fff;
	border: none;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Title = styled.div`
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	font-size: 16px;
	color: rgba(0 0 0 / 60%);
`;

const FeedList = styled.ul`
	margin-top: 16px;

	li {
		position: relative;
		display: flex;
		align-items: center;
		font-size: 14px;
		margin: 12px 0;

		& > div {
			display: flex;
			flex-direction: column;
		}
		button {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-weight: 600;
			padding: 16px;
			max-height: 32px;
			max-width: 480px;
			color: rgba(0 0 0 / 60%);
			background-color: transparent;
			border-radius: 15px;
			box-shadow: inset 0 0 0 1px rgba(0 0 0 / 60%);
		}
	}
`;

const Avatar = styled.div`
	background-image: url("/images/hashtag-icon.svg");
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	width: 48px;
	height: 48px;
	margin-right: 8px;
`;

const Recommendation = styled.div`
	.link {
		color: #0a66c2;
		display: flex;
		align-items: center;
		font-size: 14px;
	}
`;

const BannerCard = styled(FollowCard)`
	img {
		width: 100%;
		height: 100%;
	}
`;

export default Rightside;

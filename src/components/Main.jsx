import { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import PostModal from "./PostModal";
import ReactPlayer from "react-player";

import { getArticlesAPI } from "../actions";

const Main = ({ user, loading, articles }) => {
	const [showModal, setShowModal] = useState("closed");

	useEffect(() => {
		getArticlesAPI();
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) {
			return;
		}

		switch (showModal) {
			case "open":
				setShowModal("closed");
				break;
			case "closed":
				setShowModal("open");
				break;
			default:
				setShowModal("closed");
				break;
		}
	};

	return (
		<>
			{articles.length === 0 ? (
				<p>There are no articles</p>
			) : (
				<Container>
					<Sharebox>
						<div>
							{user && user.photoURL ? (
								<img src={user.photoURL} alt='User placeholder' />
							) : (
								<img src='/images/user.svg' alt='User placeholder' />
							)}
							<button onClick={handleClick} disabled={loading ? true : false}>
								Start a post
							</button>
						</div>
						<div>
							<button>
								<img src='/images/photo-icon.svg' alt='Camera icon' />
								<span>Photo</span>
							</button>
							<button>
								<img src='/images/video-icon.svg' alt='Event icon' />
								<span>Video</span>
							</button>
							<button>
								<img src='/images/event-icon.svg' alt='Event icon' />
								<span>Event</span>
							</button>
							<button>
								<img src='/images/article-icon.svg' alt='Event icon' />
								<span>Write article</span>
							</button>
						</div>
					</Sharebox>
					<Content>
						{loading && <img src={"/images/spin-loader.svg"} alt='' />}
						{articles.length > 0 &&
							articles.map((article, key) => (
								<Article key={key}>
									<SharedActor>
										<div className='link'>
											<img src={article.actor.image} alt='' />
											<div>
												<span>{article.actor.title}</span>
												<span>{article.actor.description}</span>
												<span>
													{article.actor.date.toDate().toLocaleDateString()}
												</span>
											</div>
										</div>
										<button>
											<img src='/images/ellipsis.svg' alt='Ellipsis' />
										</button>
									</SharedActor>
									<Description>{article.description}</Description>
									<SharedImg>
										<div className='link'>
											{!article.sharedImage && article.video ? (
												<ReactPlayer width={"100%"} url={article.video} />
											) : (
												article.sharedImage && (
													<img src={article.sharedImage} alt='' />
												)
											)}
										</div>
									</SharedImg>
									<SocialCounts>
										<li>
											<button>
												<img src='/images/like-icon.svg' alt='Like emoji' />
												<img src='/images/clap-icon.svg' alt='Clapping emoji' />
												<span>75</span>
											</button>
										</li>
										<li>
											<div className='link'>{article.comments} comments</div>
										</li>
									</SocialCounts>
									<SocialActions>
										<p>
											<button>
												<img src='/images/like.svg' alt='Like icon' />
											</button>
											<span>Like</span>
										</p>
										<p>
											<button>
												<img src='/images/comments.svg' alt='Comments icon' />
											</button>
											<span>Comments</span>
										</p>
										<p>
											<button>
												<img src='/images/share.svg' alt='Share icon' />
											</button>
											<span>Share</span>
										</p>
										<p>
											<button>
												<img src='/images/send.svg' alt='Send icon' />
											</button>
											<span>Send</span>
										</p>
									</SocialActions>
								</Article>
							))}
					</Content>

					<PostModal showModal={showModal} handleClick={handleClick} />
				</Container>
			)}
		</>
	);
};

const Container = styled.div`
	grid-area: main;
`;

const CommonCard = styled.div`
	position: relative;
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Sharebox = styled(CommonCard)`
	display: flex;
	flex-direction: column;
	margin: 0 0 8px;
	color: #958b7b;
	background: #fff;

	div {
		button {
			display: flex;
			align-items: center;
			font-size: 14px;
			font-weight: 600;
			line-height: 1.5;
			min-height: 48px;
			color: rgb(0, 0, 0, 0.6);
			background: transparent;
			border: none;
		}

		&:first-child {
			display: flex;
			align-items: center;
			padding: 8px 16px 0;

			img {
				width: 48px;
				margin-right: 8px;
				border-radius: 50%;
			}

			button {
				flex-grow: 1;
				text-align: left;
				margin: 4px 0;
				padding-left: 16px;
				background-color: #fff;
				border-radius: 35px;
				border: 1px solid rgb(0, 0, 0, 0.15);
			}
		}

		&:nth-child(2) {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding-bottom: 4px;

			button {
				img {
					margin: 0 4px 0 -2px;
				}
				span {
					color: #70b5f9;
				}
			}
		}
	}
`;

const Article = styled(CommonCard)`
	margin: 0 0 8px;
	padding: 0;
	overflow: visible;
`;

const SharedActor = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	margin-bottom: 8px;
	padding: 12px 16px 0;

	.link {
		display: flex;
		flex-grow: 1;
		margin-right: 13px;
		overflow: hidden;

		img {
			height: 48px;
			width: 48px;
		}

		div {
			display: flex;
			flex-direction: column;
			flex-basis: 0;
			flex-grow: 1;
			margin-left: 8px;
			overflow: none;

			span {
				text-align: left;

				&:first-child {
					font-size: 14px;
					font-weight: 700;
					color: rgb(0, 0, 0);
				}

				&::nth-child(n + 1) {
					color: rgba(0 0 0 / 60%);
				}
			}
		}
	}

	button {
		position: absolute;
		right: 12px;
		top: 0;
		background-color: transparent;
		border: none;
	}
`;

const Description = styled.div`
	padding: 0 16px;
	overflow: hidden;
	text-align: left;
`;

const SharedImg = styled.div`
	margin-top: 8px;
	width: 100%;
	display: block;
	position: relative;
	background-color: #f9fafb;

	img {
		object-fit: contain;
		width: 100%;
		height: auto;
	}
`;

const SocialCounts = styled.ul`
	line-height: 1.5;
	display: flex;
	align-items: flex-start;
	overflow: auto;
	margin: 0 16px;
	padding: 8px 0;
	border-bottom: 1px solid #e9e5df;

	li {
		margin-right: 5px;
		font-size: 12px;

		button {
			display: flex;
			align-items: center;
			border: none;
			background: transparent;
		}
	}
`;

const SocialActions = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	min-height: 40px;
	margin: 0;
	padding: 8px;

	p {
		display: flex;
		align-items: center;
	}

	button {
		padding: 8px;
		border: none;
		background: transparent;

		@media (min-width: 768px) {
			span {
				margin-left: 8px;
			}
		}
	}

	span {
		color: #0a66c2;
	}
`;

const Content = styled.div`
	text-align: center;

	& > img {
		width: 30px;
	}
`;

const mapStateToProps = (state) => {
	return {
		loading: state.articleState.loading,
		user: state.userState.user,
		articles: state.articleState.articles
	};
};

const mapDispatchToProps = (dispatch) => ({
	getArticlesAPI: () => dispatch(getArticlesAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

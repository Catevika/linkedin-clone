import { useState } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { Timestamp } from "firebase/firestore";
import styled from "styled-components";
import { postArticleAPI } from "../actions";

const PostModal = ({ user, showModal, handleClick }) => {
	const [editorText, setEditorText] = useState("");
	const [shareImage, setShareImage] = useState("");
	const [videoLink, setVideoLink] = useState("");
	const [assetArea, setAssetArea] = useState("");

	const handleChange = (e) => {
		const image = e.target.files[0];

		if (image === "" || image === undefined) {
			alert(`Not an image, the image file is ${typeof image}`);
			return;
		}

		setShareImage(image);
	};

	const switchAssetArea = (area) => {
		setShareImage("");
		setVideoLink("");
		setAssetArea(area);
	};

	const reset = (e) => {
		setEditorText("");
		setShareImage("");
		setVideoLink("");
		handleClick(e);
	};

	const postArticle = (e) => {
		console.log(e);
		e.preventDefault();
		if (e.target !== e.currentTarget) {
			return;
		}

		const payload = {
			image: shareImage,
			video: videoLink,
			user: user,
			description: editorText,
			timestamp: Timestamp.now()
		};

		postArticle(payload);
		reset(e);
	};

	return (
		<>
			{showModal === "open" && (
				<Container>
					<Content>
						<PostHeader>
							<h1>Create a post</h1>
							<button onClick={(e) => reset(e)}>
								<img src='/images/close-icon.svg' alt='Close icon' />
							</button>
						</PostHeader>
						<SharedContent>
							<UserInfo>
								{user && user.photoURL ? (
									<img src={user.photoURL} alt='User placeholder' />
								) : (
									<img src='/images/user.svg' alt='User placeholder' />
								)}
								<span>{user ? user.displayName : "Name"}</span>
							</UserInfo>
							<Editor>
								<textarea
									name='Editor Text'
									id='editor-text'
									value={editorText}
									onChange={(e) => setEditorText(e.target.value)}
									placeholder='What do you want to talk about?'
									autoFocus={true}
								/>
								{assetArea === "image" && (
									<UploadImage>
										<input
											type='file'
											accept='image/gif, image/jpeg, image/jpg, image/png'
											name='image'
											id='file'
											style={{ display: "none" }}
											onChange={handleChange}
										/>
										<p>
											<label htmlFor='file'>Select an image to share</label>
										</p>
										{shareImage && (
											<img src={URL.createObjectURL(shareImage)} alt='' />
										)}
									</UploadImage>
								)}
								{assetArea === "media" && (
									<>
										<input
											type='text'
											placeholder='Please input a video link'
											value={videoLink}
											onChange={(e) => setVideoLink(e.target.value)}
										/>
										{videoLink && (
											<ReactPlayer width={"100%"} url={videoLink} />
										)}
									</>
								)}
							</Editor>
						</SharedContent>
						<SharedCreation>
							<AttachAssets>
								<AssetButton onClick={() => switchAssetArea("image")}>
									<img src='/images/share-image.svg' alt='' />
								</AssetButton>
								<AssetButton onClick={() => switchAssetArea("media")}>
									<img src='/images/share-video.svg' alt='' />
								</AssetButton>
							</AttachAssets>
							<SharedComment>
								<AssetButton>
									<img src='/images/share-comment.svg' alt='' />
									<span>Anyone</span>
								</AssetButton>
							</SharedComment>
							<PostButton
								disabled={!editorText ? true : false}
								onClick={(e) => postArticle(e)}
							>
								Post
							</PostButton>
						</SharedCreation>
					</Content>
				</Container>
			)}
		</>
	);
};

const Container = styled.div`
	position: fixed;
	inset: 0;
	z-index: 9999;
	background-color: rgba(0 0 0 / 80%);
	animation: fadeIn 0.3s;
`;

const Content = styled.div`
	position: relative;
	top: 32px;
	display: flex;
	flex-direction: column;
	max-height: 90%;
	width: 100%;
	max-width: 552px;
	margin: 0 auto;
	overflow: initial;
	background-color: #fff;
	border-radius: 5px;
`;

const PostHeader = styled.div`
	display: block;
	padding: 16px 28px;
	border-bottom: 1px solid rgba(0 0 0 / 15%);
	line-height: 1.5;
	color: rgba(0 0 0 / 60%);
	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		height: 40px;
		width: 40px;
		min-width: auto;
		color: rgba(0 0 0 / 15%);
		border: 1px solid rgba(0 0 0 / 50%);
		border-radius: 5px;
	}

	svg,
	img {
		pointer-events: none;
	}
`;

const SharedContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-y: auto;
	background-color: transparent;
	padding: 8px 12px;
`;
const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 24px;

	svg,
	img {
		height: 48px;
		width: 48px;
		background-clip: content-box;
		border: 2px solid transparent;
		border-radius: 50%;
	}

	span {
		font-weight: 600;
		line-height: 1.5;
		margin-left: 5px;
	}
`;

const SharedCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
	height: 40px;
	min-width: auto;
	opacity: 0.5;
	background-color: transparent;
`;

const AttachAssets = styled.div`
	display: flex;
	align-items: center;
	padding-right: 8px;

	${AssetButton} {
		width: 40px;
		border: none;
	}
`;

const SharedComment = styled.div`
	padding-left: 8px;
	margin-right: auto;
	background-color: transparent;
	border-left: 1px solid rgba(0 0 0 / 20%);

	${AssetButton} {
		display: flex;
		align-items: center;

		svg {
			height: 40px;
			width: 40px;
			margin: 0 5px;
			opacity: 0.5;
		}

		span {
			margin-left: 5px;
			font-size: 14px;
			color: rgb(0, 0, 0);
		}
	}
`;

const PostButton = styled.button`
	min-width: 60px;
	border-radius: 20px;
	padding-left: 16px;
	padding-right: 16px;
	color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.4)" : "#fff")};
	background-color: ${(props) =>
		props.disabled ? "rgba(0, 0, 0, 0.4)" : "#0a66c2"};
	border: none;

	&:hover {
		color: ${(props) => (props.disabled ? "rgb(255, 255, 255, 0.8)" : "#fff")};
		background-color: ${(props) =>
			props.disabled ? "rgba(0, 0, 0, 0.6)" : "#004182"};
	}
`;

const Editor = styled.div`
	padding: 12px 24px;

	textarea {
		min-height: 100px;
		width: 100%;
		resize: none;
		border: none;
		outline-color: rgba(10, 102, 194, 0.5);
		border-radius: 5px;
		padding: 20px;
	}

	input {
		font-family: arial, sans-serif;
		font-size: 16px;
		height: 35px;
		width: 100%;
		margin-bottom: 20px;
	}
`;

const UploadImage = styled.div`
	text-align: center;

	img {
		width: 100%;
	}
`;

const mapStateToProps = (state) => {
	return {
		user: state.userState.user
	};
};

const mapDispatchToProps = (dispatch) => ({
	postArticle: (payload) => postArticleAPI(payload)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);

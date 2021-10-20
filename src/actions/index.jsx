import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL
} from "firebase/storage";
import { auth, provider, storage } from "../firebase/firebase";
import db from "../firebase/firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";

export const setUser = (payload) => ({
	type: SET_USER,
	user: payload
});

export const setLoading = (status) => ({
	type: SET_LOADING_STATUS,
	status: status
});

export const getArticles = (payload) => ({
	type: GET_ARTICLES,
	payload: payload
});

export function signInAPI() {
	return (dispatch) => {
		dispatch(setLoading(true));

		signInWithPopup(auth, provider)
			.then((payload) => {
				dispatch(setUser(payload.user));
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				alert(errorCode, errorMessage, email);
			});
	};
}

export function getUserAuth() {
	return (dispatch) => {
		onAuthStateChanged(auth, (user) => {
			auth && dispatch(setUser(user));
		});
	};
}

export function signOutAPI() {
	return (dispatch) => {
		signOut(auth)
			.then(() => dispatch(setUser(null)))
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				alert(errorCode, errorMessage, email);
			});
	};
}

export function postArticleAPI(payload) {
	return (dispatch) => {
		if (payload.image !== "") {
			const storageRef = ref(storage, `images/${payload.image.name}`);

			uploadBytes(storageRef, payload.image);

			const uploadTask = uploadBytesResumable(storageRef, payload.image);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Progress: ${progress}%`);
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log(`Upload is running. Progress: ${progress}%`);
							break;
						default:
							break;
					}
				},
				(error) => {
					console.log(error.code);
				},
				async () => {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					db.collection("articles").add({
						actor: {
							description: payload.user.email,
							title: payload.user.displayName,
							date: payload.timestamp,
							image: payload.user.photoURL
						},
						video: payload.video,
						sharedImage: downloadURL,
						comments: 0,
						description: payload.description
					});
					dispatch(setLoading(false));
				}
			);
		} else if (payload.video) {
			db.collection("articles").add({
				actor: {
					description: payload.user.email,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL
				},
				video: payload.video,
				sharedImage: "",
				comments: 0,
				description: payload.description
			});
			dispatch(setLoading(false));
		}
	};
}

export function getArticlesAPI() {
	return (dispatch) => {
		let payload;

		db.collection("articles")
			.orderBy("actor.date", "desc")
			.onSnapshot((snapshot) => {
				payload = snapshot.docs.map((doc) => doc.data());
				dispatch(getArticles(payload));
			});
	};
}

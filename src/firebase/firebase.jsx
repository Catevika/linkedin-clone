import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCew684DEmxUuV22CH6MZ0vEeRufzywZ2Y",
	authDomain: "linkedin-clone-bf7c3.firebaseapp.com",
	projectId: "linkedin-clone-bf7c3",
	storageBucket: "linkedin-clone-bf7c3.appspot.com",
	messagingSenderId: "958096104311",
	appId: "1:958096104311:web:26e0de1fa956d983f99f72"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.addScope("profile");

const storage = getStorage(firebaseApp);

export { auth, provider, storage };

export default db;

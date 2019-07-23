import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// For testing
import mockFirebase from './mockFirebase';

const firebaseConfig = {
    apiKey: "AIzaSyBeyO5IOu5V8PvFuyChsPW3E08jWThwIyg",
    authDomain: "react-password-manager-e4c28.firebaseapp.com",
    databaseURL: "https://react-password-manager-e4c28.firebaseio.com",
    projectId: "react-password-manager-e4c28",
    storageBucket: "react-password-manager-e4c28.appspot.com",
    messagingSenderId: "849667597350",
    appId: "1:849667597350:web:b7a59e847fb4b71e"
};

class Firebase {
	constructor() {
		firebase.initializeApp(firebaseConfig);
		this.auth = firebase.auth();
		this.db = firebase.firestore();
		this.session = firebase.auth.Auth.Persistence.SESSION;
		this.none = firebase.auth.Auth.Persistence.NONE;
	}
	register(email, password) {
		return this.auth.createUserWithEmailAndPassword(email, password)
	}
	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}	
	logout() {
		return this.auth.signOut()
	}
	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}
}

const firebaseInstance = process.env.NODE_ENV === 'test' ?	mockFirebase : new Firebase();
export default firebaseInstance;
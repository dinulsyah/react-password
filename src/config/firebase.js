import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBeyO5IOu5V8PvFuyChsPW3E08jWThwIyg",
    authDomain: "react-password-manager-e4c28.firebaseapp.com",
    databaseURL: "https://react-password-manager-e4c28.firebaseio.com",
    projectId: "react-password-manager-e4c28",
    storageBucket: "react-password-manager-e4c28.appspot.com",
    messagingSenderId: "849667597350",
    appId: "1:849667597350:web:b7a59e847fb4b71e"
};

firebase.initializeApp(config);

firebase.firestore()

export default firebase;
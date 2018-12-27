import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD6E1BVuhrPhgJyhYGLYQovT7b7sDYMgD8",
    authDomain: "react-slack-clone-64649.firebaseapp.com",
    databaseURL: "https://react-slack-clone-64649.firebaseio.com",
    projectId: "react-slack-clone-64649",
    storageBucket: "react-slack-clone-64649.appspot.com",
    messagingSenderId: "265993632039"
};
firebase.initializeApp(config);

export default firebase;
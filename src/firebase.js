import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBTGVMrsqA7iFInq4WX2nHKCWhHn3Wyc2Y",
    authDomain: "chat-app-92ef5.firebaseapp.com",
    databaseURL: "https://chat-app-92ef5.firebaseio.com",
    projectId: "chat-app-92ef5",
    storageBucket: "chat-app-92ef5.appspot.com",
    messagingSenderId: "242275632827",
    appId: "1:242275632827:web:c57ed34d70b736e2"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
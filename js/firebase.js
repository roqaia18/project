// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAdG9L5kfRQiDtRutsbQHzha0WDGk5F6ho",
    authDomain: "web-firebase-e8885.firebaseapp.com",
    databaseURL: "https://web-firebase-e8885-default-rtdb.firebaseio.com",
    projectId: "web-firebase-e8885",
    storageBucket: "web-firebase-e8885.appspot.com",
    messagingSenderId: "858767393250",
    appId: "1:858767393250:web:97183ae83838c4254579bb",
    measurementId: "G-4FJSL32GKT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
//db.setting({timestampsInSanpshots : true});
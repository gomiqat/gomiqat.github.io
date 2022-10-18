/*--------firebase configuration-------------*/

const app = firebase.initializeApp({
  apiKey: "AIzaSyDnhWYeM7cy9GduqE8LlaMC0wQIk5Fr7eM",
  authDomain: "iochat-3210.firebaseapp.com",
  databaseURL: "https://iochat-3210.firebaseio.com",
  projectId: "iochat-3210",
  storageBucket: "iochat-3210.appspot.com"
});

// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(app);

/*------------create firebase references-------------*/
const auth        = firebase.auth(); 

const storageRef = firebase.storage().ref();

const dbRef       = firebase.firestore();
const settings = {timestampsInSnapshots: true}; 

dbRef.settings(settings);

const usersRef    = dbRef.collection('users');
const messagesRef = dbRef.collection('messages');
const postsRef = dbRef.collection('posts');
const friendsRef  = dbRef.collection('friends');
const recentChatRef  = dbRef.collection('recentchat');
const otpRef    = dbRef.collection('otp');





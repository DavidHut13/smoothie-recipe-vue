import firebase from 'firebase'


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqsKyYKfSBuEjOYaIo0J-xQC6sUurMda8",
    authDomain: "smoothieninja-6dc5f.firebaseapp.com",
    databaseURL: "https://smoothieninja-6dc5f.firebaseio.com",
    projectId: "smoothieninja-6dc5f",
    storageBucket: "smoothieninja-6dc5f.appspot.com",
    messagingSenderId: "820091175938"
  };
  const firebaseApp = firebase.initializeApp(config);
 

  // export firestore database
  export default firebaseApp.firestore()
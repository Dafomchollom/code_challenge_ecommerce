import firebase from 'firebase';
import 'firebase/firestore';

// firebase config ideally should be in .env file
const config = {
  apiKey: 'AIzaSyACvIxGK5C2wYDCFhSPej5kLxpPkBenYgg',
  authDomain: 'codechallenge-43f9a.firebaseapp.com',
  projectId: 'codechallenge-43f9a',
  storageBucket: 'codechallenge-43f9a.appspot.com',
  messagingSenderId: '186966245472',
  appId: '1:186966245472:web:e1a74f6ce27fac38698305',
  measurementId: 'G-FKVH9WCKN5',
};

// initialize firebase
!firebase.apps.length && firebase.initializeApp(config);
// if () {
//   ;
// }

const firestore = firebase.firestore();

export { firestore };

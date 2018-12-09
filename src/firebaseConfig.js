import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDqEP7wJzYUDVeErnrCdbjlxUUFoCsQhBw",
    authDomain: "dawid-kurkiewicz.firebaseapp.com",
    databaseURL: "https://dawid-kurkiewicz.firebaseio.com",
    projectId: "dawid-kurkiewicz",
    storageBucket: "dawid-kurkiewicz.appspot.com",
    messagingSenderId: "238182251236"
  };

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
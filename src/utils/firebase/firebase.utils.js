import { initializeApp } from 'firebase/app'
import { getAuth, signinWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// My web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZEBYuNoh-_pYOHjNH9odlTW20HVSrueQ",
    authDomain: "e-clothing-db-98fa6.firebaseapp.com",
    projectId: "e-clothing-db-98fa6",
    storageBucket: "e-clothing-db-98fa6.appspot.com",
    messagingSenderId: "38454442610",
    appId: "1:38454442610:web:a2f720eb9ec93e5171e0eb"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth()
  export const signinWithGooglePopup = () => signInWithPopup(auth, provider) 
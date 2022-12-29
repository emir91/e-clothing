import { initializeApp } from 'firebase/app'
import { getAuth, signinWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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

const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error creating the user', error.message);
        }

        return userDocRef;
    }
}
import { initializeApp } from 'firebase/app'
import { 
        getAuth, 
        createUserWithEmailAndPassword, 
        signInWithRedirect, 
        signInWithPopup, 
        signInWithEmailAndPassword,
        signOut, 
        onAuthStateChanged, 
        GoogleAuthProvider } from 'firebase/auth'
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
export const siginWithGoogleRedirect = () => signInWithRedirect(auth, provider)

const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('Error creating the user', error.message);
        }

        return userDocRef;
    }
}

export const createUserEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInEmailPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}

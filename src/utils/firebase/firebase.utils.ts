import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithRedirect,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    User,
    NextOrObserver
} from 'firebase/auth'
import { collection, getDocs, getFirestore, doc, getDoc, query, setDoc, writeBatch, QueryDocumentSnapshot } from 'firebase/firestore'
import { Category } from '../../store/category/category.types';

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
});

export const auth = getAuth();
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);
export const siginWithGoogleRedirect = () => signInWithRedirect(auth, provider);

const db = getFirestore();

type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd> 
(collectionKey: string, objectsToAdd: T[]):Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async ():Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
}

export type AdditionalInformation = {
  displayName?: string
};

export type UserData = {
  createdAt: Date;
  email: string;
  displayName: string;
};

export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInformation: AdditionalInformation = {}):
    Promise<void | QueryDocumentSnapshot<UserData>> => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
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
            console.log('Error creating the user', error);
        }

    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createUserEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInEmailPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    onAuthStateChanged(auth, callback);
}

export const getCurrentUser = ():Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
}
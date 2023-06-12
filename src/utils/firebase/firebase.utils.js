import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
 } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDerAaJGoJNeHPJPKB4lC9mgPZajmd5HdI",
  authDomain: "crwn-clothing-db-fac5f.firebaseapp.com",
  projectId: "crwn-clothing-db-fac5f",
  storageBucket: "crwn-clothing-db-fac5f.appspot.com",
  messagingSenderId: "874071183300",
  appId: "1:874071183300:web:ea2b79fe4f163599131e91"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionInformation});
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

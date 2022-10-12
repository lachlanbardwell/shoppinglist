import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAHCtJQd8LPD2i6g8wueubKZr0Z0U6v08s',
  authDomain: 'shoppinglist-1990a.firebaseapp.com',
  projectId: 'shoppinglist-1990a',
  storageBucket: 'shoppinglist-1990a.appspot.com',
  messagingSenderId: '71634451092',
  appId: '1:71634451092:web:61f784559f7b3da0ee5281',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

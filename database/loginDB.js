import { db } from './firestore.js';
import { getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc, setDoc } from 'firebase/firestore';

const accountsCollection = collection(db, 'accounts');


export async function addAccount(username, password) {
    let user = { username: username, password: password };

    await setDoc(doc(db, "accounts", username), user);
}

export async function getAccount(username) {
    const docRef = doc(db, 'accounts', username);
    const accountDoc = await getDoc(docRef);
    let data = accountDoc.data();
    if (data != null) {
        return data;
    } else {
        return null;
    }
}
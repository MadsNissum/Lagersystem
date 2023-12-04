import { db } from './firestore.js';
import { getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc, setDoc } from 'firebase/firestore';

const accountsCollection = collection(db, 'accounts');


export async function addAccount(username, password, salt) {
    let user = { username: username, password: password, salt: salt };

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

/**
 * Function deletes account from the database
 * @param {String} username username of account to delete
 * @author Amin
 */
export async function deleteAccount(username) {
    const docRef = doc(db,'accounts', username)
    await deleteDoc(docRef)
}
import { db } from './firestore.js';
import { getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';

/**
 * @param {*} username 
 * @param {*} password 
 * @param {*} salt 
 * @author Kasper
 */
export async function addAccount(username, password, salt) {
    let user = { username: username, password: password, salt: salt };

    await setDoc(doc(db, "accounts", username), user);
}

/**
 * 
 * @param {*} username 
 * @returns
 * @author Kasper
 */
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
 * Deletes an account from the database based on the provided username
 * @param {*} username - Username of the account
 * @author Amin Dahir
 */
export async function deleteAccount(username) {
    const docRef = doc(db,'accounts', username)
    await deleteDoc(docRef)
}
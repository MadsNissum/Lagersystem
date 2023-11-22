import { db } from './firestore.js';
import { getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';

const emailsCollection = collection(db, 'emails');

/**
 * Function returns all emails from firestore storage
 * @returns email list signed up
 * @author Mads Nissum
 */
export async function getEmails() {
    return (await getDocs(emailsCollection)).docs.map(doc => doc.data().email);
}

/**
 * Adds an email to firestore storage
 * @param {String} email String of email adresse
 * @author Mads Nissum
 */
export async function addEmail(email) {
    await addDoc(emailsCollection, email)
}
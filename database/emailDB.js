import { db } from './firestore.js';
import { getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';

const emailsCollection = collection(db, 'emails');

/**
 * Function returns all emails from firestore storage
 * @returns email list signed up
 * @author Mads Nissum
 */
export async function getEmails() {
    return (await getDocs(emailsCollection)).docs.map(doc => {
        let mail = doc.data();
        mail.id = doc.id;
        return mail;
    });
}

/**
 * Adds an email to firestore storage
 * @param {String} email String of email adresse
 * @author Mads Nissum
 */
export async function addEmail(email) {
    return await addDoc(emailsCollection, email)
}

/**
 * Function return a Email with a given id from firestore
 * @param {String} id Auto generated ID from firebase
 * @returns {Object} Email object
 * @author Mads Nissum & Mikkel Hess
 */
export async function getEmail(id) {
    const docRef = doc(db, 'emails', id);
    const emailDoc = await getDoc(docRef);
    let data = emailDoc.data();
    if (data != null) {
        let email = data;
        email.id = emailDoc.id
        return email;
    } else {
        return null;
    }
}


/**
 * Deletes doc with gives id from firebase
 * @param {String} id Auto generated ID from firebase
 * @author Mads Nissum & Mikkel Hess
 */
export async function deleteEmail(id) {
    const docRef = doc(db, 'emails', id);
    return await deleteDoc(docRef);
}

/**
 * Updates product with given id in firestore
 * @param {String} id Auto generated ID from firebase
 * @param {Object} product class Product object
 * @author Mads Nissum
 */
export async function updateEmail(id, email) {
    const docRef = doc(db, 'emails', id);
    await updateDoc(docRef, email);
}



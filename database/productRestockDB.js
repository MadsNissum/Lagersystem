import { db } from './firestore.js';
import { getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';

const productRestockCollection = collection(db, 'productRestock');

/**
 * Inserts a record when restocking product to warehouse.
 * @param {*} product Product that was added
 * @author Kasper
 */
export async function addProductRestock(product) {
    product.restockDate = new Date().toISOString().split('T')[0];
    await addDoc(productRestockCollection, product);
}
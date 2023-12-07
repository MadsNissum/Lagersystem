import { Product } from '../model/Product.js';
import { db } from './firestore.js';
import { collection, getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';

/**
 * Inserts a record when restocking product to warehouse.
 * @param {Product} product Product that was added
 * @author Kasper
 */
export async function addProductRestock(product) {
    product.restockDate = new Date().toISOString().split('T')[0];
    return await setDoc(doc(db, "productRestock", product.productID), product);
}

/**
 * Returns a productrestock by id
 * @param {String} id of productrestock
 * @author Kasper
 */
export async function getProductRestock(id) {
    const docRef = doc(db, 'productRestock', id);
    const restockDoc = await getDoc(docRef);
    return restockDoc.data();
}

/**
 * Deletes productRestock by id
 * @param {String} id of productRestock
 * @author Kasper
 */
export async function deleteProductRestock(id) {
    const docRef = doc(db, 'productRestock', id);
    return await deleteDoc(docRef);
}
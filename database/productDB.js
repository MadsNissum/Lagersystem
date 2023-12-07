import { db } from './firestore.js';
import { collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { Product } from "../model/Product.js";
import { addProductRestock } from './productRestockDB.js';

const productCollection = collection(db, 'products');

/**
 * Function returns an array of products from firestore
 * @author Mads Nissum & Kasper
 */
export async function getProducts() {
    let productQueryDocs = await getDocs(productCollection);
    let products = productQueryDocs.docs.map(doc => {
        let data = doc.data();
        let product = new Product(data.brand, Number(data.price), new Date(data.expirationDate), data.location, Number(data.quantity));
        product.setId(doc.id);
        return product;
    })
    return products;
}

/**
 * Function return a Product with a given id from firestore
 * @param {String} id Auto generated ID from firebase
 * @author Mads Nissum & Mikkel Hess
 */
export async function getProduct(id) {
    const docRef = doc(db, 'products', id);
    const productDoc = await getDoc(docRef);
    let data = productDoc.data();
    if (data != null) {
        let product = new Product(data.brand, Number(data.price), new Date(data.expirationDate), data.location, Number(data.quantity));
        product.setId(productDoc.id);
        return product;
    } else {
        return null;
    }
}

/**
 * Deletes doc with gives id from firebase
 * @param {String} id Auto generated ID from firebase
 * @author Mads Nissum & Mikkel Hess
 */
export async function deleteProduct(id) {
    const docRef = doc(db, 'products', id);
    return await deleteDoc(docRef);
}

/**
 * Function add product to firestore doc
 * @param {Object} product class Product object with the given attributes
 * @author Mads Nissum
 */
export async function addProduct(product) {
    // TODO Error checking on variables from product!
    let document = await addDoc(productCollection, product);
    product.productID = document.id;
    addProductRestock(product);
    return document;
}

/**
 * Updates product with given id in firestore
 * @param {String} id Auto generated ID from firebase
 * @param {Product} product class Product object
 * @author Mads Nissum
 */
export async function updateProduct(id, product) {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, product);
}

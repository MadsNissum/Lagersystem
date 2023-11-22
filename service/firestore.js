import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { Product } from "../model/Product.js";

const firebaseConfig = {
    apiKey: "AIzaSyBd9SN8XxBIHhI1HdabdJfqt6HcveoYGoU",
    authDomain: "lagersystem-4f134.firebaseapp.com",
    projectId: "lagersystem-4f134",
    storageBucket: "lagersystem-4f134.appspot.com",
    messagingSenderId: "573614154864",
    appId: "1:573614154864:web:b3a2ee053065bc1c3e00b5"
};

const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);
const productCollection = collection(db, 'products');
const transactionCollection = collection(db, 'transaction');
const productRestockCollection = collection(db, 'productRestock');
const emailsCollection = collection(db, 'emails');

/**
 * Function returns an array of products from firestore
 * @returns {Array<Product>} An array of Products
 * @author Mads Nissum & Kasper
 */
async function getProducts() {
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
 * @returns {Product} A product
 * @author Mads Nissum & Mikkel Hess
 */
async function getProduct(id) {
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
async function deleteProduct(id) {
    const docRef = doc(db, 'products', id);
    return await deleteDoc(docRef);
}


/**
 * Function add product to firestore doc
 * @param {Object} product class Product object with the given attributes
 * @author Mads Nissum
 */
async function addProduct(product) {
    // TODO Error checking on variables from product!
    let document = await addDoc(productCollection, product);
    addProductRestock(product);
    return document;
}

/**
 * Updates product with given id in firestore
 * @param {*} id Auto generated ID from firebase
 * @param {*} product class Product object
 * @author Mads Nissum
 */
async function updateProduct(id, product) {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, product);
}

/**
 * Counts down products quantity, deletes if quanitity less than 1
 * @param {*} id Id of document in firebase
 * @param {*} amount that will be sold
 * @author Kasper
 */
async function registerSale(id, amount) {
    let product = await getProduct(id);
    product.quantity = product.quantity - amount;
    if (product.quantity <= 0) {
        deleteProduct(id);
    } else {
        updateProduct(id, JSON.parse(JSON.stringify(product)));
    }
    
    addTransaction(product, amount);
}
/**
 * Inserts a record of a transaction when registering a sale.
 * @param {*} product Product that was sold
 * @param {*} amount Amount that was sold
 * @author Kasper
 */
async function addTransaction(product, amount) {
    product.amountSold = amount;
    product.transactionDate = new Date().toISOString().split('T')[0];
    await addDoc(transactionCollection, JSON.parse(JSON.stringify(product)));
}

/**
 * Inserts a record when restocking product to warehouse.
 * @param {*} product Product that was added
 * @author Kasper
 */
async function addProductRestock(product) {
    product.restockDate = new Date().toISOString().split('T')[0];
    await addDoc(productRestockCollection, product);
}

async function getEmails() {
    return (await getDocs(emailsCollection)).docs.map(doc => doc.data().email);
}

async function addEmail(email) {
    await addDoc(emailsCollection, email)
}

export default { getProducts, getProduct, deleteProduct, addProduct, updateProduct, registerSale, getEmails, addEmail };

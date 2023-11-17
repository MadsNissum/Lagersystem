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
    await deleteDoc(docRef);
}


/**
 * Function add product to firestore doc
 * @param {Object} product class Product object with the given attributes
 * @author Mads Nissum
 */
async function addProduct(product) {
    // TODO Error checking on variables from product!
    await addDoc(productCollection, product);
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
async function sellProduct(id, amount) {
    let product = await getProduct(id);
    product.quantity -= amount;
    if (product.quantity <= 0) {
        deleteProduct(id);
    } else {
        updateProduct(id, JSON.parse(JSON.stringify(product)));
    }
}


export default { getProducts, getProduct, deleteProduct, addProduct, updateProduct };

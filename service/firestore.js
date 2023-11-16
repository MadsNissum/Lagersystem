import { initializeApp } from "firebase/app"
import {getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc} from 'firebase/firestore'
import Product from "../model/Product.js";

const firebaseConfig = {
    apiKey: "AIzaSyBd9SN8XxBIHhI1HdabdJfqt6HcveoYGoU",
    authDomain: "lagersystem-4f134.firebaseapp.com",
    projectId: "lagersystem-4f134",
    storageBucket: "lagersystem-4f134.appspot.com",
    messagingSenderId: "573614154864",
    appId: "1:573614154864:web:b3a2ee053065bc1c3e00b5"
};

const firebase_app = initializeApp(firebaseConfig)
const db = getFirestore(firebase_app)
const productCollection = collection(db, 'products')

/**
 * 
 * @returns 
 */
async function getProducts() {
  let productQueryDocs = await getDocs(productCollection)
  let products = productQueryDocs.docs.map(doc => {
      let data = doc.data()
      data.docID = doc.id
      return data
  })
  return products
}

/**
 * 
 * @param {String} id Auto generated ID from firebase
 * @returns 
 */
async function getProduct(id) {
  const docRef = doc(db, 'products', id)
  const productQueryDoc = await getDoc(docRef)
  let product = productQueryDoc.data()
  product.docID = productQueryDoc.id
  return product
}

/**
 * 
 * @param {String} id Auto generated ID from firebase
 */
async function deleteProduct(id) {
  const deletedProduct = await deleteDoc(db, 'products, id')
}


/**
 * 
 * @param {Product} product
 * @author Mads Nissum
 */
async function addProduct(product) {
  await addDoc(productCollection, product)
}


export default { getProducts, getProduct, deleteProduct, addProduct };

import { initializeApp } from "firebase/app"
import {getFirestore,
    collection,
    getDocs,
    getDoc, 
    doc, 
    deleteDoc, 
    addDoc,
    updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBd9SN8XxBIHhI1HdabdJfqt6HcveoYGoU",
    authDomain: "lagersystem-4f134.firebaseapp.com",
    projectId: "lagersystem-4f134",
    storageBucket: "lagersystem-4f134.appspot.com",
    messagingSenderId: "573614154864",
    appId: "1:573614154864:web:b3a2ee053065bc1c3e00b5"
  };

const firebase_app = initializeApp(firebaseConfig)
export const db = getFirestore(firebase_app)
const productCollection = collection(db, 'products')

const getProducts = async () => {
    let productsQueryDocs = await getDocs(productCollection);
    let products = productsQueryDocs.docs.map(doc => {
      let data = doc.data();
      data.docID = doc.id;
      return data;
    });
    return products;
  }

async function main() {
    let data = await getProducts();
    console.log(data);
}

main();

const getProduct = async (id) => {
    const docRef = doc(db, 'products', id)
    const productQueryDoc = await getDoc(docRef)
    let product = productQueryDoc.data()
    product.docID = productQueryDoc.id
    return product
}




export default {getProduct, deleteProduct, firebase_app, firebaseConfig };
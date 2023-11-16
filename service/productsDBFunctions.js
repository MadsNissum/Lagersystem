import { initializeApp } from "firebase/app"
import firebaseConfig from './firestore.js'
//import firebase_app from './firestore.js'
import db from './firestore.js'
import {getFirestore,
    collection,
    getDocs,
    getDoc, 
    doc, 
    deleteDoc, 
    addDoc,
    updateDoc
} from 'firebase/firestore'

//const firebase_app = initializeApp(firebaseConfig)
//const db = getFirestore(firebase_app)
//console.log(db)
//const productCollections = collection(db, '')

//Get all products
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


  export default { getProducts };

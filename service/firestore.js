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
  const db = getFirestore(firebase_app)
  const productCollections = collection(db,'lagersystem')


const getProduct = async (id) => {
    const docRef = doc(db, 'products', id)
    const productQueryDoc = await getDoc(docRef)
    let product = productQueryDoc.data()
    product.docID = productQueryDoc.id
    return product
}




  export default {getProduct, deleteProduct};
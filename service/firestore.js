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



function registerProducts(Brand, price, expiration, location, amount) {
    for(let i = 0; i < amount; i++) {
        let product = new Product(Brand, price, expiration, location);
        firestore.addProduct(product)
    }
}

registerProducts("vand", 50, Date.parse("2023-11-16"), "skåde", 20);


const firestoreAdd = {
    addProduct: async function(product) {
        try {
            const docRef = await firestore.collection('products').addProduct({
                Brand: product.Brand,
                price: product.price,
                expiration: product.expiration
            });
            console.log('Product added with ID ', docRef.id)
            return docRef.id;
        } catch (error) {
            console.error('Error adding product: ', error)
        }
    }
}

  export default {getProduct, deleteProduct};
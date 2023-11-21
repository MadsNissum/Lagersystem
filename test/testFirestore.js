import { initializeApp } from "firebase/app";
import { setDoc, doc, deleteDoc, getFirestore } from "firebase/firestore"
import { Product } from "../model/Product.js"
import firestore from "../service/firestore.js"
import assert from 'assert'

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

/**
 * Tests that getProduct gets the correct product object
 * @author Mikkel Hess
 */
describe('Get Product Method', () => {
    it('Should get the correct product', async () => {
        let product = new Product('Smirnoff Ice', 12, new Date("2013-11-15"), 'Skåde', 20)
        let id = 'test';
        const docRef = doc(db, 'products', id);

        await setDoc(docRef, product.toPlainObject())

        assert.deepStrictEqual(await firestore.getProduct('test'), product)
        firestore.deleteProduct(id)
    })
})

/**
 * Tests that the product gets deleted
 * @author Mikkel Hess
 */
describe('Delete product method', () => {

    it('Should delete the correct product', async () => {
        let product = new Product('Carlsberg', 28, new Date("2013-11-16"), 'Skåde', 100)
        let id = 'tes'
        const docRef = doc(db, 'products', id)

        await setDoc(docRef, product.toPlainObject())

        await firestore.deleteProduct(id)

        assert.strictEqual(await firestore.getProduct(id), null)


    })

})
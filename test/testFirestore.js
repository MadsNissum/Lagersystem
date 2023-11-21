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
describe('Get Product function', () => {
    it('Should get the correct product', async () => {
        let product = new Product('Smirnoff Ice', 12, new Date("2013-11-15"), 'Skåde', 20)
        let id = 'test';
        const docRef = doc(db, 'products', id);

        await setDoc(docRef, product.toPlainObject())

        assert.deepStrictEqual(await firestore.getProduct(id), product)
        firestore.deleteProduct(id)
    })
})

/**
 * Tests that the product gets deleted
 * @author Mikkel Hess
 */
describe('Delete product function', () => {

    it('Should delete the correct product', async () => {
        let product = new Product('Carlsberg', 28, new Date("2013-11-16"), 'Skåde', 100)
        let id = 'test'
        const docRef = doc(db, 'products', id)

        await setDoc(docRef, product.toPlainObject())

        await firestore.deleteProduct(id)

        assert.strictEqual(await firestore.getProduct(id), null)
    })
})

/**
 * Tests that the product gets added
 * @author Mikkel Hess
 */
describe('Add Product function', () => {

    it('Should add the correct product', async () => {
        let product = new Product('Carlsberg', 28, new Date("2013-11-16"), 'Skåde', 100)
      
        //adding the product
        let docRef = await firestore.addProduct(product.toPlainObject())

        let addedProduct = await firestore.getProduct(docRef.id);

        assert.deepStrictEqual(product.toPlainObject(),addedProduct.toPlainObject());

        await firestore.deleteProduct(docRef.id);
    })
})

/**
 * Tests that ensures a product recieves an update
 * @author Amin Dahir
 */
describe('Update product function', () => {
    it('Should update a product properly', async () => {
        let preProduct = new Product('Grimbgen', 40, new Date("2013-11-28"), 'Skåde', 20);
        let productId = "grimbergenTest";
        const docRef = doc(db, 'products', productId);
        await setDoc(docRef, preProduct.toPlainObject());

        let updatedDetails = {
            brand: "Grimbergen",
            price: 38
        };

        await firestore.updateProduct(productId, updatedDetails);

        let afterProduct = await firestore.getProduct(productId);

        assert.strictEqual(afterProduct.name, updatedDetails.name);
        assert.strictEqual(afterProduct.price, updatedDetails.price);
        await firestore.deleteProduct(productId);
    })
})

describe('Register sale function', () => {
    it('Should update the product if the quantity after the sale is above 0', ()=> {

    })

    it('Should delete the product if the quantity is below 0 after the sale', ()=> {

    })

})

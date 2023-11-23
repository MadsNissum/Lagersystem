import { setDoc, doc, deleteDoc, getFirestore, getDoc } from "firebase/firestore"
import { Product } from "../model/Product.js"
import assert from 'assert'
import { addProduct, deleteProduct, getProduct, updateProduct } from "../database/productDB.js";
import { db } from '../database/firestore.js';
import { addTransaction, getTransactions, registerSale } from "../database/transactionDB.js";
import { expect } from 'chai';
import { collection } from 'firebase/firestore';

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

        assert.deepStrictEqual(await getProduct(id), product)
        deleteProduct(id)
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

        await deleteProduct(id)

        assert.strictEqual(await getProduct(id), null)
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
        let docRef = await addProduct(product.toPlainObject())

        let addedProduct = await getProduct(docRef.id);

        assert.deepStrictEqual(product.toPlainObject(), addedProduct.toPlainObject());

        await deleteProduct(docRef.id);
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

        await updateProduct(productId, updatedDetails);

        let afterProduct = await getProduct(productId);

        assert.strictEqual(afterProduct.name, updatedDetails.name);
        assert.strictEqual(afterProduct.price, updatedDetails.price);
        await deleteProduct(productId);
    })
})

describe('Register sale function', async () => {
    //FEJLER NOGLE GANGE???
    it('Should update the product if the quantity after the sale is above 0', async () => {
        let product = new Product('Vand', 50, new Date("2013-11-28"), 'Skåde', 20)
        let docRef1233 = await addProduct(product.toPlainObject())
        
        await registerSale(docRef1233.id, 10)
        let productdb = await getProduct(docRef1233.id)

        assert.equal(productdb.quantity, 10)

        await deleteProduct(docRef1233.id)
    });

    it('Should delete the product if the quantity is below 0 after the sale', async () => {

        let product_ = new Product('Syltet Gris',30,new Date("2015-11-29"),'Danmark', 10)
        let thaDocRef = await addProduct(product_.toPlainObject())

        await registerSale(thaDocRef.id,30)

        assert.strictEqual(await getProduct(thaDocRef.id),null)
    })

})

describe('Sales endpoint test', () => {
    it('Should return an array of transactions', async () => {
        let transactions = await getTransactions();
        assert(Array.isArray(transactions), 'Transactions should be an array');
    });
});

//kan ikk få den til at virke
describe('Add transaction test',()=>{
    it('Should add the transaction into the database', async ()=>{
        let product = new Product('Carlsberg', 28, new Date("2013-11-16"), 'Skåde', 100)

        let transDoc = await addTransaction(product,10)

        const transactionCollection = await collection(db, 'transaction');

        const docSnapshot = await transactionCollection.doc().get()
        
        expect(docSnapshot.exists).to.be.true;
    })

})



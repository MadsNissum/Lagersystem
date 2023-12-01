import { Product } from "../../model/Product.js";
import { addTransaction, registerSale, getTransactions, deleteTransaction } from "../../database/transactionDB.js";
import { collection } from "firebase/firestore";
import { db } from "../../database/firestore.js";
import { addProduct, getProduct, deleteProduct } from "../../database/productDB.js";
import assert from 'assert'



    describe('Register sale function', async () => {
        it('Should update the product if the quantity after the sale is above 0', async () => {
            let product = new Product('Kanin', 50, new Date("2013-11-28"), 'Skåde', 20);
            let docRef1233 = await addProduct(product.toPlainObject());

            let sale = await registerSale(docRef1233.id, 10);
            let productdb = await getProduct(docRef1233.id);

            assert.equal(productdb.quantity, 10);
            
            deleteProduct(docRef1233.id)
            deleteTransaction(sale.id)
        });

        it('Should delete the product if the quantity is below 0 after the sale', async () => {

            let product_ = new Product('fuckda', 30, new Date("2015-11-29"), 'Danmark', 10);
            let thaDocRef = await addProduct(product_.toPlainObject());

            let sale = await registerSale(thaDocRef.id, 30);

            assert.strictEqual(await getProduct(thaDocRef.id), null);

            deleteTransaction(sale.id)
        });
    });

    describe('Sales endpoint test', () => {
        it('Should return an array of transactions', async () => {
            let transactions = await getTransactions();
            assert(Array.isArray(transactions), 'Transactions should be an array');
        });
    });




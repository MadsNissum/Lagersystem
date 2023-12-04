import { Product } from "../../model/Product.js";
import { addTransaction, registerSale, getTransactions, deleteTransaction } from "../../database/transactionDB.js";
import { collection } from "firebase/firestore";
import { db } from "../../database/firestore.js";
import { addProduct, getProduct, deleteProduct } from "../../database/productDB.js";
import assert from 'assert'


/**
 * Tests the register sale function, with two scenarios
 * 1) Updates the product if the sale leaves quantity above 0
 * 2) Deletes the product if the sale leaves quantity below 0
 * @author Mikkelhess
 */
    describe('Register sale function', async () => {
        it('Should update the product if the quantity after the sale is above 0', async () => {
            let testProdukt = new Product('testProdukt', 50, new Date("2013-11-28"), 'Skåde', 20);
            let docRef = await addProduct(testProdukt.toPlainObject());

            let sale = await registerSale(docRef.id, 10);
            let productdb = await getProduct(docRef.id);

            assert.equal(productdb.quantity, 10);
            
            deleteProduct(docRef.id)
            deleteTransaction(sale.id)
        });

        it('Should delete the product if the quantity is below 0 after the sale', async () => {

            let gløggProdukt = new Product('Gløgg', 30, new Date("2015-11-29"), 'Danmark', 10);
            let thaDocRef = await addProduct(gløggProdukt.toPlainObject());

            let sale = await registerSale(thaDocRef.id, 30);

            assert.strictEqual(await getProduct(thaDocRef.id), null);

            deleteProduct(thaDocRef.id);
            deleteTransaction(sale.id);
        });
    });

    /**
     * Tests the functionality of the getTransaction method, to see if 
     * it succesfully returns an array
     * @author Mikkelhess
     */
    describe('Sales endpoint test', () => {
        it('Should return an array of transactions', async () => {
            let transactions = await getTransactions();
            assert(Array.isArray(transactions), 'Transactions should be an array');
        });
    });




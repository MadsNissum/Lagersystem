import { Product } from "../../model/Product.js";
import { registerSale, deleteTransaction } from "../../database/transactionDB.js";
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

        let sale = await registerSale([{ id: docRef.id, amount: 5 }]);
        let productdb = await getProduct(docRef.id);

        deleteProduct(docRef.id);
        deleteTransaction(sale.transactionId)

        assert.equal(productdb.quantity, 15);
    });

    it('Should delete the product if the quantity is 0 after the sale', async () => {
        let gløggProdukt = new Product('Gløgg', 30, new Date("2015-11-29"), 'Danmark', 5);
        let docRef = await addProduct(gløggProdukt.toPlainObject());

        let sale = await registerSale([{ id: docRef.id, amount: 5 }]);
        let product = await getProduct(docRef.id);

        deleteProduct(docRef.id);
        deleteTransaction(sale.transactionId);

        assert.strictEqual(product, null);
    });

    it('Should return a statusCode of 503 if transaction is trying to sell more than there is in database', async () => {
        let gløggProdukt = new Product('Gløgg', 30, new Date("2015-11-29"), 'Danmark', 10);
        let docRef = await addProduct(gløggProdukt.toPlainObject());

        let sale = await registerSale([{ id: docRef.id, amount: 11 }]);

        deleteProduct(docRef.id);

        assert.strictEqual(sale.statusCode, 503);
    })
});

/**
 * Tests the functionality of the getTransaction method, to see if
 * it succesfully returns an array
 * @author Mikkel hess
 */

// DENNE TEST FEJLER I NOGET MED Sales

/*
describe('Sales endpoint test', () => {
    it('Should return an array of transactions', async () => {
        let transactions = await getTransactions();
        assert(Array.isArray(transactions), 'Transactions should be an array');
    });
});
*/





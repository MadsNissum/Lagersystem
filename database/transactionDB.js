import { db } from './firestore.js';
import { getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { deleteProduct, getProduct, updateProduct } from "./productDB.js";

const transactionCollection = collection(db, 'transaction');

/**
 * Counts down products quantity, deletes if quanitity less than 1
 * @param {*} id Id of document in firebase
 * @param {*} amount that will be sold
 * @author Kasper
 */
export async function registerSale(id, amount) {
    let product = await getProduct(id);
    product.quantity = product.quantity - amount;
    if (product.quantity <= 0) {
        deleteProduct(id);
    } else {
        updateProduct(id, product.toPlainObject());
    }
    
    addTransaction(product, amount);
}

/**
 * Inserts a record of a transaction when registering a sale.
 * @param {*} product Product that was sold
 * @param {*} amount Amount that was sold
 * @author Kasper
 */
async function addTransaction(product, amount) {
    product.amountSold = amount;
    product.transactionDate = new Date().toISOString().split('T')[0];
    await addDoc(transactionCollection, JSON.parse(JSON.stringify(product)));
}

/**
 * Function returns an array of products from firestore
 * @returns {Array<Sale>} An array of Products
 * @author Lucas Andersen
 */
export async function getTransactions() {
    let transactionsQueryDocs = await getDocs(transactionCollection);
    let transactions = transactionsQueryDocs.docs.map(doc => {
        let data = doc.data();
        let transaction = new Sale(Number(data.amountSold), data.brand, new Date(data.expirationDate), data.location, Number(data.price), Number(data.quantity), new Date(data.expirationDate))
        return transaction;
    });
    return transactions;
}
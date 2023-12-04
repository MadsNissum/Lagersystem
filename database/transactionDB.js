import { db } from './firestore.js';
import { getFirestore, collection, getDocs, getDoc, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { deleteProduct, getProduct, updateProduct } from "./productDB.js";
import { Sale } from '../model/Sale.js';
import { addMessageToMail } from '../service/observer.js';

const transactionCollection = collection(db, 'transaction');

/**
 * Counts down products quantity, deletes if quanitity less than 1
 * @param {*} sale an object with an array of ids of products sold and their corresponding amountsold
 * @author Kasper
 */
export async function registerSale(sale) {
    console.log("INDE I REGISTER SALE");

    for (let i = 0; i < sale.length; i++) {
        let product = await getProduct(sale[i].id);
        let newProductQuantity = product.quantity - sale[i].amount;

        console.log(sale[i]);

        console.log(newProductQuantity);

        // Add logic for each type of product there is and when you should be notified
        if (product.quantity >= 10 && newProductQuantity < 10) {
            console.log("INDE I IF");
            addMessageToMail(`Beholdning  af <b>${product.brand}</b> med ID: <b>${product.getId()}</b> er lavere 10`);
        }

            product.quantity = newProductQuantity;

        if (product.quantity <= 0) {
            deleteProduct(sale[i].id);
        } else {
            updateProduct(sale[i].id, product.toPlainObject());
        }
    }

    addTransaction(sale);
}

/**
 * Inserts a record of a transaction when registering a sale.
 * @param {*} sale an object with an array of ids of products sold and their corresponding amountsold
 * @author Kasper
 */
export async function addTransaction(sale) {
    let bon = [];

    for (let i = 0; i < sale.length; i++) {
        let product = await getProduct(sale[i].id);
        product.amountSold = sale[i].amount
        product.transactionDate = new Date().toISOString().split('T')[0];
        bon.push(product);
    }
    let finalBon = { bon };
    return await addDoc(transactionCollection, JSON.parse(JSON.stringify(finalBon)));
}

/**
 * 
 * @param {*} id 
 * @returns doc
 * @author Mikkel Hess
 */
export async function deleteTransaction(id) {
    const docRef = doc(db, 'transaction', id);
    return await deleteDoc(docRef);
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
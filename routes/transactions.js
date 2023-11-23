import express from 'express';
import { getTransactions } from '../database/transactionDB.js';

const router = express.Router();

// GET
router.get('/', async (request, response) => {
    let transactions = await getTransactions();
    response.render('transactions', { transactions: transactions });
});



export default router;
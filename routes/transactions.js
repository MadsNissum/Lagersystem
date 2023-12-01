import express from 'express';
import { getTransactions } from '../database/transactionDB.js';

const router = express.Router();

// GET
router.get('/', async (request, response) => {
    let receipts = await getTransactions();
    response.render('transactions', { receipts: receipts });
});



export default router;
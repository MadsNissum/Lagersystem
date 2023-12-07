import express from 'express';
import { getProducts } from '../database/productDB.js';
import { registerSale } from '../database/transactionDB.js';

const router = express.Router();

// GET
router.get('/', async (request, response) => {
    let products = await getProducts();
    response.render('sales', { products: products })

});

// POST
router.post('/', async (request, response) => {
    let status = await registerSale(request.body);
    response.sendStatus(status.statusCode);
});

export default router;


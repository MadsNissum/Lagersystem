import express from 'express';
import { getProducts } from '../database/productDB.js';
import { registerSale } from '../database/transactionDB.js';

const router = express.Router();

router.get('/', async (request, response) => {
    let products = await getProducts();
    response.render('sales',{products: products})

});

router.post('/', async (request, response) => {
    console.log(request.body);
    let status = await registerSale(request.body);
    response.sendStatus(status);
});

export default router;


import express from 'express';
import { getProducts } from '../database/productDB.js';
import { get } from 'http';

const router = express.Router();

router.get('/', async (request, response) => {
    let products = await getProducts();
    response.render('sales',{products: products})

});

export default router;


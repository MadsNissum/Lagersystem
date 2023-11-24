import express from 'express';
import { getFilterAndSortProducts } from '../service/filterProduct.js';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../database/productDB.js';

const router = express.Router();

router.get('/', async (request, response) => {
    const { brand, price, quantity, expirationDate, location } = request.query;

    let products = await getFilterAndSortProducts(brand, price, quantity, expirationDate, location);
    response.render('inventory', { products: products });
});

router.get('/get', async (request, response) => {
    response.send(await getProducts());
});

router.get('/create', (request, response) => {
    response.render('createUpdateProduct', { product: null });
});

router.get('/edit/:id', async (request, response) => {
    const id = request.params.id;
    let product = await getProduct(id);
    response.render('createUpdateProduct', { product: product });
});

// POSTS
router.post('/create', (request, response) => {
    console.log(request.body.product);
    addProduct(request.body.product);
    response.sendStatus(201);
});

// PUT
router.put('/edit', (request, response) => {
    updateProduct(request.body.id, request.body.product);
    response.sendStatus(201);
});

// DELETES
router.delete('/:id', async (request, response) => {
    deleteProduct(request.params.id).then(() => {
        response.sendStatus(200);
    }).catch((reason) => {
        console.error('Error deleting product:', reason);
        response.status(500).send('Internal Server Error');
    });
});

export default router;
// Imports
import express from 'express';
import { Product } from './model/Product.js'
import firestore from './service/firestore.js';
import * as url from 'url';
import { notifyPeople } from './service/observer.js';


// Consts
const app = express();
const port = 80;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set('views', `${__dirname}/assets/views`);
app.set('view engine', 'pug');


// Middleware
app.set('views', `${__dirname}/assets/views`);
app.set('view engine', 'pug');
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


// GETS
app.get('/', (request, response) => {
    const product = new Product('Carlsberg', 50, new Date('2023-11-15'), 'Skåde', 20, '016120');
    response.send(product);
})

app.get('/products', async (request, response) => {
    let products = await firestore.getProducts();
    response.render('products', { products: products });
})

app.get('/addProduct', (request, response) => {
    response.render('createUpdateProduct', { product: null });
})

app.get('/editProduct/:id', async (request, response) => {
    const id = request.params.id;
    let product = await firestore.getProduct(id);
    response.render('createUpdateProduct', { product: product });
})

// DELETES
app.delete('/products/:id', async (request, response) => {
    await firestore.deleteProduct(request.params.id);
    response.sendStatus(200);
})

// POSTS
app.post('/createProduct', (request, response) => {
    firestore.addProduct(request.body.product);
    response.sendStatus(201);
})

app.post('/registerSale', async (request, response) => {
    request.body.array.forEach(order => {
        firestore.registerSale(order.id, order.amount);
    });
    response.sendStatus(200);
})


// PUT
app.put('/editProduct', (request, response) => {
    firestore.updateProduct(request.body.id, request.body.product);
    response.sendStatus(201);
})


// Function running once a day
setInterval(notifyPeople, 1000 * 60 * 60 * 24);


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));





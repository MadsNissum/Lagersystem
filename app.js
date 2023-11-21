// Imports
import express, { response } from 'express';
import { Product } from './model/Product.js'
import firestore from './service/firestore.js';
import * as url from 'url';
import { log } from 'console';


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
    const { brand, price, quantity, expirationDate, location } = request.query;

    let products = await getFilterAndSortProducts(brand, price, quantity, expirationDate, location);
    response.render('products', { products: products });
})

app.get('/getProducts', async (request, response) => {
    let products = await firestore.getProducts();
    response.send(products);
});

app.get('/addProduct', (request, response) => {
    response.render('createUpdateProduct', { product: null });
})

app.get('/editProduct/:id', async (request, response) => {
    const id = request.params.id;
    let product = await firestore.getProduct(id);
    response.render('createUpdateProduct', { product: product });
})

/**
 * 
 * @param {?String} brand 
 * @param {?Int} price 
 * @param {?Int} quantity 
 * @param {?String} expirationDate 
 * @param {?String} location 
 * @author Lucas Andersen
 */
async function getFilterAndSortProducts(brand, price, quantity, expirationDate, location) {
    try {
        let productsList = await firestore.getProducts();

        const filteredList = productsList.filter((product) => (
            (brand && brand != 'Alle' ? brand == product.brand : true) &&
            (price && price != 'Alle' ?  price == product.price : true) &&
            (quantity && quantity != 'Alle' ? quantity == product.quantity : true) &&
            (location && location != 'Alle' ? location == product.location : true)
        ));
        
        const sortedList = filteredList.sort((a, b) => {
            const dateA = new Date(a.expirationDate);
            const dateB = new Date(b.expirationDate);

            return expirationDate && expirationDate.toLowerCase() === 'ascending'
              ? dateA - dateB
              : dateB - dateA;
          });
          return sortedList;

    } catch (error) {
        console.error('Error fetching or processing products:', error);
    }
}

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


// PUT
app.put('/editProduct', (request, response) => {
    firestore.updateProduct(request.body.id, request.body.product);
    response.sendStatus(201);
})


// Function running once a day
// setInterval(myFunction, 1000 * 60 * 60 * 24);


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));





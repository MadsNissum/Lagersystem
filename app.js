// Imports
import express from 'express';
import Product from './model/Product.js'
import firestore from './service/firestore';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Consts
const app = express();
const port = 8000;

// Get the directory name using the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.set('views', `${__dirname}/assets/views`);
app.set('view engine', 'pug');
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
app.get('/', (request, response) => {
    let produkt = new Product('Carlsberg',50,Date.parse("2023-11-15"),"Skåde");

    response.send(produkt);
})

function registerProducts(Brand, price, expiration, location, amount) {
    for(each in amount) {
        let product = new Product(Brand, price, expiration, location);
        firestore.addProduct(product)
    }
}
app.get('/products', (request, response) => {
    response.render('products');
})


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));


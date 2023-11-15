// Imports
import express from 'express';
import Product from './model/Product.js'
import firestore from './service/firestore.js';
import * as url from 'url';

// Consts
const app = express();
const port = 80;

// Directory name
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Middleware
app.set('views', `${__dirname}/assets/views`);
app.set('view engine', 'pug');
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (request, response) => {
    let produkt = new Product('Carlsberg',50, new Date("2023-11-15"),"Skåde");
    response.send(produkt);
})

app.get('/products', (request, response) => {
    response.render('products');
})


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));



// Amin Funktion
function registerProducts(Brand, price, expiration, location, amount) {
    for(each in amount) {
        let product = new Product(Brand, price, expiration, location);
        firestore.addProduct(product)
    }
}

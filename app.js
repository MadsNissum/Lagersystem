// Imports
import express from 'express';
import Product from './model/Product.js'
import firestore from './service/firestore.js';
import * as url from 'url';
import productsDBFunctions from './service/productsDBFunctions.js'

import productsDBFunctions from './service/productsDBFunctions.js';

// Consts
const app = express();
const port = 80;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

let product1 = new Product('Tuborg Classic', 10, Date.now, 'Skåde', 100, 1);
let product2 = new Product('Heineken', 15, Date.now, 'Aarhus', 30, 2);
let product3 = new Product('Carlsberg', 13, Date.now, 'Vandrup', 40, 3);
let product4 = new Product('Brezzer', 30, Date.now, 'Herning', 10, 4);
let product5 = new Product('Mokai', 40, Date.now, 'Vejle', 15, 5);

let productsArray = [];
productsArray.push(product1);
productsArray.push(product2);
productsArray.push(product3);
productsArray.push(product4);
productsArray.push(product5);

app.set('views', `${__dirname}/assets/views`);
app.set('view engine', 'pug');


// Middleware
app.set('views', `${__dirname}/assets/views`);
app.set('view engine', 'pug');
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (request, response) => {
    const product = new Product('Carlsberg',50,new Date('2023-11-15'),'Skåde', 20, '016120');
    response.send(product);
})

app.get('/products', (request, response) => {
    response.render('products', {products: productsArray});
})
app.delete('/products/:id',async (req,res)=>{
    let product = await productsDBFunctions.deleteProduct()
})


app.get('/addProduct', (request, response) => {
    response.render('createUpdateProduct');
})


//console.log(productsDBFunctions.getProducts);

// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));



// Amin Funktion
function registerProducts(Brand, price, expiration, location, amount) {
    for(each in amount) {
        let product = new Product(Brand, price, expiration, location);
        firestore.addProduct(product)
    }
}

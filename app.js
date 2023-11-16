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
    response.render('products');
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

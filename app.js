// Imports
import express from 'express';
import firestore from './service/firestore';
import Product from './model/Product.js'

// Consts
const app = express();
const port = 80;

// Middleware
app.use(express.static('public'));
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


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));

//Brand, expiration, price, location



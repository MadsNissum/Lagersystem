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


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));
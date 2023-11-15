// Imports
import express from 'express';
import Product from './model/Product.js'
import firestore from './service/firestore';

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

Date.parse()



// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));
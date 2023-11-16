// Imports
import express from 'express';
import Product from './model/Product.js'
import firestore from './service/firestore.js';
import * as url from 'url';
import productsDBFunctions from './service/productsDBFunctions.js'

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
    let produkt = new Product('Carlsberg',50,Date.parse("2023-11-15"),"Skåde");

    response.send(produkt);
})

/* app.put('/products'), async (request, response) => {
    const productId = request.params.productId;
    const {name, price, expiration, location} = request.body;

    try {
        let existingProduct = productsDBFunctions.productId;
      
        if(!existingProduct) {
            return response.status(404).send("Product not found")
        } else {
            return response.status
        }
    }
} */




export default firestoreAdd;


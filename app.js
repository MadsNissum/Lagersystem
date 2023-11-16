// Imports
import express from 'express';
import Product from './model/Product.js'
import * as url from 'url';

// Consts
const app = express();
const port = 80;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set('views', `${__dirname}/assets/views`);
app.set('view engine', 'pug');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (request, response) => {
    let produkt = new Product('Carlsberg',50,Date.parse("2023-11-15"),"Skåde");

    response.send(produkt);
})


app.get('/addProduct', (request, response) => {
    response.render('createUpdateProduct');
})


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));
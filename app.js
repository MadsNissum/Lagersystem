// Imports
import express, { response } from 'express';
import Product from './model/Product.js'
import firestore from './service/firestore.js';
import * as url from 'url';


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

app.get('/products', async (request, response) => {
    let products = await firestore.getProducts(); 
    response.render('products', {products: products});
})
app.delete('/products/:id',async (req,res)=>{
    let product = await productsDBFunctions.deleteProduct()
})

app.get('/addProduct', (request, response) => {
    response.render('createUpdateProduct');
})

app.get('/addProduct/:id', (request, response) => {
    const id = request.params.id;
    let product = firestore.getProduct(id)
    response.render('createUpdateProduct', product)
})

app.post('editProduct', (request, response) => {

})

app.get('/addProduct/:id', (request, response) => {
    const id = request.params.id;
    let product = firestore.getProduct(id)
    response.render('createUpdateProduct', product)
})

app.post('editProduct', (request, response) => {

})

app.get('/addProduct/:id', (request, response) => {
    const id = request.params.id;
    let product = firestore.getProduct(id)
    response.render('createUpdateProduct', product)
})

app.post('editProduct', (request, response) => {

})


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));






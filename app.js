// Imports
import express, { response } from 'express';
import { Product } from './model/Product.js'
import * as url from 'url';
import { notifyPeople } from './service/observer.js';
import { addEmail, deleteEmail, getEmail, getEmails, updateEmail } from './database/emailDB.js';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from './database/productDB.js';
import { getFilterAndSortProducts } from './service/filterProduct.js';
import { getTransactions } from './database/transactionDB.js';


// Consts
const app = express();
const port = 80;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// View
app.set('view engine', 'pug');
app.set('views', `${__dirname}/assets/views`);

// Middleware
app.use(express.json());
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));

// Routes


// GETS
app.get('/', (request, response) => {
    const product = new Product('Carlsberg', 50, new Date('2023-11-15'), 'Skåde', 20, '016120');
    response.send(product);
});

app.get('/products', async (request, response) => {
    const { brand, price, quantity, expirationDate, location } = request.query;

    let products = await getFilterAndSortProducts(brand, price, quantity, expirationDate, location);
    response.render('products', { products: products });
});

app.get('/getProducts', async (request, response) => {
    let products = await getProducts();
    response.send(products);
});

app.get('/addProduct', (request, response) => {
    response.render('createUpdateProduct', { product: null });
});

app.get('/editProduct/:id', async (request, response) => {
    const id = request.params.id;
    let product = await getProduct(id);
    response.render('createUpdateProduct', { product: product });
});



app.get('/emails', async (request, response) => {
    response.send(await getEmails());
});

app.get('/mail', async (request, response) => {
    response.render('mail', {mails: await getEmails()});
});

app.get('/addMail', (request, response) => {
    response.render('createUpdateMail', { email: null });
})

app.get('/editMail/:id', async (request, response) => {
    const id = request.params.id;
    let mail = await getEmail(id);

    console.log(mail);

    response.render('createUpdateMail', {email: mail});
})

app.get('/transactions', async (request, response) => {
    let transactions = await getTransactions();
    response.render('transactions', { transactions: transactions });
});

// DELETES
app.delete('/products/:id', async (request, response) => {
    deleteProduct(request.params.id).then(() => {
        response.sendStatus(200);
    }).catch((reason) => {
        console.error('Error deleting product:', reason);
        response.status(500).send('Internal Server Error');
    });
});

app.delete('/mail/:id', async (request, response) => {
    deleteEmail(request.params.id).then(() => {
        response.sendStatus(200);
    }).catch((reason) => {
        console.error('Error deleting product:', reason);
        response.status(500).send('Internal Server Error');
    });
});

// POSTS
app.post('/createProduct', (request, response) => {
    addProduct(request.body.product);
    response.sendStatus(201);
});

app.post('/registerSale', async (request, response) => {
    request.body.array.forEach(order => {
        registerSale(order.id, order.amount);
    });
    response.sendStatus(200);
});

app.post('/addEmail', async (request, response) => {
    addEmail(request.body.email);
    response.sendStatus(201);
});

// PUT
app.put('/editProduct', (request, response) => {
    updateProduct(request.body.id, request.body.product);
    response.sendStatus(201);
});

app.put('/editEmail', (request, response) => {
    updateEmail(request.body.id, request.body.email);
    response.sendStatus(201);
});


// Function running once a day and when the program starts
notifyPeople(await getEmails());
setInterval(async () => { await notifyPeople(await firestore.getEmails()) }, 1000 * 60 * 60 * 24);


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));
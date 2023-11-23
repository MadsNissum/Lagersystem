// Imports
import express, { response } from 'express';
import { Product } from './model/Product.js'
import * as url from 'url';
import { notifyPeople } from './service/observer.js';
import { getEmails } from './database/emailDB.js';
import { addProduct, deleteProduct, getProduct, getProducts } from './database/productDB.js';
import session from 'express-session';
import { addAccount, getAccount } from './database/loginDB.js';
import { log } from 'console';
import { checkAllowedPages, checkLogin } from './service/login.js';


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
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'hemmelighed',
    saveUninitialized: true,
    resave: true,
}))


app.use(checkAllowedPages);


// Routes

// GETS
app.get('/', (request, response) => {
    const product = new Product('Carlsberg', 50, new Date('2023-11-15'), 'Skåde', 20, '016120');
    response.send(product);
})

app.get('/createAccount', (request, response) => {
    response.render('createAccount');
})

app.get('/login', (request, response) => {
    response.render('loginForm');
})

app.get('/products', async (request, response) => {
    let products = await getProducts();
    response.render('products', { products: products });
})

app.get('/addProduct', (request, response) => {
    response.render('createUpdateProduct', { product: null });
})

app.get('/editProduct/:id', async (request, response) => {
    const id = request.params.id;
    let product = await getProduct(id);
    response.render('createUpdateProduct', { product: product });
})

app.get('/emails', async (request, response) => {
    response.send(await getEmails());
});

// DELETES
app.delete('/products/:id', async (request, response) => {
    const result = await deleteProduct(request.params.id);

    if (result) {
        //Deletion was successful
        response.sendStatus(200);
    } else {
        //Deletion failed
        console.error('Error deleting product:', result);
        response.status(500).send('Internal Server Error');
    }
});

// POSTS
app.post('/createProduct', (request, response) => {
    addProduct(request.body.product);
    response.sendStatus(201);
})

app.post('/registerSale', async (request, response) => {
    request.body.array.forEach(order => {
        registerSale(order.id, order.amount);
    });
    response.sendStatus(200);
})

app.post('/postLogin', async (request, response) => {
    const { username, password } = request.body;
    if (await checkLogin(username, password)) {
        request.session.isLoggedIn = true;
    }
    response.redirect('/products');
})
app.post('/postCreateAccount', (request, response) => {
    const { username, password } = request.body;
    createAccount(username, password);

    response.redirect('/login');
})

app.post('/logout', (request, response) => {
    request.session.isLoggedIn = false;
    response.redirect('/login');
})

// PUT
app.put('/editProduct', (request, response) => {
    firestore.updateProduct(request.body.id, request.body.product);
    response.sendStatus(201);
})

// Function running once a day
setInterval(() => {notifyPeople(['LagerSystemSkaade@hotmail.com'])}, 1000 * 60 * 60 * 24);





// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));





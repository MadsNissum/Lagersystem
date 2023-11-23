// Imports
import express from 'express';
import * as url from 'url';
import { notifyPeople } from './service/observer.js';
import { getEmails } from './database/emailDB.js';
import mailRoutes from './routes/mail.js';
import transactionRoutes from './routes/transactions.js';
import productRoutes from './routes/product.js';
import session from 'express-session';
import { addAccount, getAccount } from './database/loginDB.js';
import { checkAllowedPages, checkLogin } from './service/login.js';


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
app.use(session({
    secret: 'hemmelighed',
    saveUninitialized: true,
    resave: true,
}))


app.use(checkAllowedPages);


// Routes
app.use('/mail', mailRoutes);

app.use('/transactions', transactionRoutes);

app.use('/inventory', productRoutes);

app.post('/registerSale', async (request, response) => {
    request.body.array.forEach(order => {
        registerSale(order.id, order.amount);
    });
    response.sendStatus(200);
});


app.get('/createAccount', (request, response) => {
    response.render('createAccount');
});

app.get('/login', (request, response) => {
    response.render('loginForm');
});

app.post('/postLogin', async (request, response) => {
    const { username, password } = request.body;
    if (await checkLogin(username, password)) {
        request.session.isLoggedIn = true;
    }
    response.redirect('/products');
});

app.post('/postCreateAccount', (request, response) => {
    const { username, password } = request.body;
    createAccount(username, password);

    response.redirect('/login');
});

app.post('/logout', (request, response) => {
    request.session.isLoggedIn = false;
    response.redirect('/login');
});


// Function running once a day and when the program starts
notifyPeople(await getEmails());
setInterval(async () => { await notifyPeople(await firestore.getEmails()) }, 1000 * 60 * 60 * 24);


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));
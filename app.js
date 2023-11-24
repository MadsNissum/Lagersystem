// Imports
import express from 'express';
import * as url from 'url';
import { notifyPeople } from './service/observer.js';
import { getEmails } from './database/emailDB.js';
import mailRoutes from './routes/mail.js';
import transactionRoutes from './routes/transactions.js';
import productRoutes from './routes/product.js';
import loginRoutes from './routes/login.js';
import session from 'express-session';
import { checkAllowedPages } from './service/login.js';
import { registerSale } from './database/transactionDB.js';

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
}));

app.use(checkAllowedPages);

// Routes
app.use('/mail', mailRoutes);

app.use('/transactions', transactionRoutes);

app.use('/inventory', productRoutes);

app.use('/login', loginRoutes);

app.post('/registerSale', async (request, response) => {
    request.body.array.forEach(order => {
        registerSale(order.id, order.amount);
    });
    response.sendStatus(200);
});

// Function running once a day and when the program starts
notifyPeople(await getEmails());
setInterval(async () => { await notifyPeople(await getEmails()) }, 30000);
// 1000 * 60 * 60 * 24

// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));
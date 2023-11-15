// Imports
import express, { response } from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pug from 'pug';

// Consts
const app = express();
const port = 8000;

// Get the directory name using the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.set('views', `${__dirname}/assets/views`);
app.set('view engine', 'pug');
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
app.get('/', (request, response) => {
    response.send('Hello World!');
})

app.get('/products', (request, response) => {
    response.render('products');
})


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));

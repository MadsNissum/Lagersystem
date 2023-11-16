// Imports
import express, { response } from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pug from 'pug';

// Consts
const app = express();
const port = 8000;

// Fake data delete when get request works!!!! - Lucas
let productsArray = [
    { brand: "Tuborg Classic", quantity: 10, price: 20, dueDate: new Date("2023-12-01"), location: "Skåde" },
    { brand: "Brezzer", quantity: 5, price: 15, dueDate: new Date("2023-11-30"), location: "Aarhus" },
    { brand: "Mokai", quantity: 8, price: 25, dueDate: new Date("2023-12-05"), location: "Vejle" },
    { brand: "Heineken", quantity: 15, price: 18, dueDate: new Date("2023-12-10"), location: "Horsens" },
    { brand: "Carlsberg", quantity: 12, price: 22, dueDate: new Date("2023-12-08"), location: "København" }
  ];
  
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
    response.render('products', {products: productsArray});
})


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));

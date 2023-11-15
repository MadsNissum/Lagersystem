// Imports
import express, { request, response } from 'express';

// Consts
const app = express();
const port = 80;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.get('/', (request, response) => {
    response.send('Hello World!');
})


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));

//Brand, expiration, price, location


app.get('/', (request, response) => {
    response.
})
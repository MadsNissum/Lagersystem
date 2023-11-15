// Imports
import express from 'express';
import firestore from './service/firestore';

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

Date.parse()

app.get('/', (request, response) => {
    response.
})


// Listen for connection
app.listen(port, () => console.log(`Server listening on port: ${port}...`));

//Brand, expiration, price, location



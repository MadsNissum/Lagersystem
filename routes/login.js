import express from 'express';
import { checkLogin, createAccount } from '../service/login.js';

const router = express.Router();

// GET
router.get('/', (request, response) => {
    response.render('loginForm');
});


router.get('/create', (request, response) => {
    response.render('createAccount');
});


// POST
router.post('/', async (request, response) => {
    const { username, password } = request.body;
    if (await checkLogin(username, password)) {
        request.session.isLoggedIn = true;
    }
    response.redirect('/inventory');
});

router.post('/create', (request, response) => {
    const { username, password } = request.body;
    createAccount(username, password);
    response.redirect('/login');
});

router.post('/logout', (request, response) => {
    request.session.isLoggedIn = false;
    response.redirect('/login');
});

export default router;
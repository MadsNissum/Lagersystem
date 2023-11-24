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
    let statusCode = await checkLogin(username, password);
    if (statusCode == 200) {
        request.session.isLoggedIn = true;
        response.redirect('/inventory');
    } else {
        response.sendStatus(statusCode);
    }
});

router.post('/create', async (request, response) => {
    const { username, password } = request.body;
    const statusCode = await createAccount(username, password);

    if (statusCode == 201) {
        response.redirect('/login');
    } else {
        response.sendStatus(statusCode);
    }
});

router.post('/logout', (request, response) => {
    request.session.isLoggedIn = false;
    response.redirect('/login');
});

export default router;
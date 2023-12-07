import express from 'express';
import { addEmail, deleteEmail, getEmail, getEmails, updateEmail } from '../database/emailDB.js';

const router = express.Router();

// GET
router.get('/', async (request, response) => {
    response.render('mail', { mails: await getEmails() });
});

router.get('/add', (request, response) => {
    response.render('createUpdateMail', { email: null });
});

router.get('/edit/:id', async (request, response) => {
    const id = request.params.id;
    let mail = await getEmail(id);
    response.render('createUpdateMail', { email: mail });
});

// POST
router.post('/add', async (request, response) => {
    addEmail(request.body.email);
    response.sendStatus(201);
});

// DELETE
router.delete('/:id', async (request, response) => {
    deleteEmail(request.params.id).then(() => {
        response.sendStatus(200);
    }).catch((reason) => {
        console.error('Error deleting product:', reason);
        response.status(500).send('Internal Server Error');
    });
});

// PUT
router.put('/edit', (request, response) => {
    updateEmail(request.body.id, request.body.email);
    response.sendStatus(201);
});

export default router;
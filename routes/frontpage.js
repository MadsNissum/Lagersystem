import express from 'express';

const router = express.Router();

// GET
router.get('/', (request, response) => {
    response.render('frontpage');
});

export default router;
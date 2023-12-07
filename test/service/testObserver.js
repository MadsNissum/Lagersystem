import assert from 'assert'
import { addMessageToMail, notifyPeople } from '../../service/observer.js'
import { Product } from '../../model/Product.js'
import { addProduct, deleteProduct } from '../../database/productDB.js';

/**
 * Test observer.js file
 * @author Mads Nissum
 */
describe('Observer notifications', () => {
    describe('notifyPeople()', () => {
        it('Should return null when nothing in database expires in 10 days', async () => {            
            let response = await notifyPeople([{email: 'LagerSystemSkaade@hotmail.com'}]);

            assert.equal(response, null);
        });

        it('Should return response when product in data expires in 10 days', async () => {
            let date = new Date();
            date.setDate(date.getDate() + 10);
            let product = new Product('Test', 25, date, 'Test', 20);
            let docRef = await addProduct(product.toPlainObject());

            let receivers = [{email: 'LagerSystemSkaade@hotmail.com'}];

            let response = await notifyPeople(receivers);

            await deleteProduct(docRef.id);
            assert.equal(response.info.accepted.toString(), receivers[0].email);
        });
    });

    describe('addMessageToMail()', () => {
        it('Should add message correctly', async () => {
            addMessageToMail("Testing");

            let receivers = [{email: 'LagerSystemSkaade@hotmail.com'}];

            let response = await notifyPeople(receivers);

            assert.equal(response.message, '<h2>Inventar der skal bestilles:</h2>Testing<br>');
        });

        
    })
});


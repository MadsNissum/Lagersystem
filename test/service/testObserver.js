import assert from 'assert'
import { notifyPeople } from '../../service/observer.js'
import { Product } from '../../model/Product.js'
import firestore from '../../service/firestore.js';

/**
 * Test observer.js file
 * @author Mads Nissum
 */
describe('Observer notifications', () => {
    describe('notifyPeople()', () => {
        it('Should return null when nothing in database expires in 10 days', async () => {
            let response = await notifyPeople(['LagerSystemSkaade@hotmail.com']);
            assert.equal(null, response);
        });

        it('Should return response when product in data expires in 10 days', async () => {
            let date = new Date();
            date.setDate(date.getDate() + 10);
            let product = new Product('Test', 25, date, 'Test', 20);
            let docRef = await firestore.addProduct(product.toPlainObject());

            let receivers = ['LagerSystemSkaade@hotmail.com', 'nissum_10@hotmail.com']

            notifyPeople(receivers).then(async (response) => {
                await firestore.deleteProduct(docRef.id);
                assert.equal(receivers.toString(), response.accepted.toString());
                done();
            });
        });
    });
});




import { Sale } from "../../model/Sale.js"
import assert from 'assert'

/**
 * Tests instantiation of Product object
 * @author Lucas Andersen
 */
describe('Sale Constructor', () => {
    describe('Initialize object properties', () => {
        // Act
        const transaction = new Sale(10, "Carlsberg", new Date('2023-11-15'), "Skåde", 30, 50, new Date('2023-11-15'));

        it('Should display amountSold correctly', () => {
            assert.equal(transaction.amountSold, 10);
        });
        it('Should display brand correctly', () => {
            assert.equal(transaction.brand, "Carlsberg");
        });
        it('Should display expirationDate correctly', () => {
            assert.equal(transaction.expirationDate.getDate(), new Date('2023-11-15').getDate());
        });
        it('Should display expirationDate correctly', () => {
            assert.equal(transaction.location, "Skåde");
        });
        it('Should display expirationDate correctly', () => {
            assert.equal(transaction.price, 30);
        });
        it('Should display expirationDate correctly', () => {
            assert.equal(transaction.quantity, 50);
        });
        it('Should display expirationDate correctly', () => {
            assert.equal(transaction.transactionDate.getDate(), new Date('2023-11-15').getDate());
        });
    })

    /**
     * Tests that the product variables are the correct types
     * @author Lucas Andersen
     */
    describe('Type checkings', () => {
        const transaction = new Sale(10, "Carlsberg", new Date(Date.now), "Skåde", 30, 50, new Date(Date.now));

        it('Id should be of type number', () => {
            assert.strictEqual(typeof transaction.amountSold, 'number')
        });
        it('Id should be of type string', () => {
            assert.strictEqual(typeof transaction.brand, 'string')
        });
        it('Expiration date should be a Date object', () => {
            assert.strictEqual(transaction.expirationDate instanceof Date, true)
        })
        it('Id should be of type string', () => {
            assert.strictEqual(typeof transaction.location, 'string')
        });
        it('Id should be of type number', () => {
            assert.strictEqual(typeof transaction.price, 'number')
        });
        it('Id should be of type number', () => {
            assert.strictEqual(typeof transaction.quantity, 'number')
        });
        it('Transaction date should be a Date object', () => {
            assert.strictEqual(transaction.transactionDate instanceof Date, true)
        });
    });

    /**
     * Tests that errors gets thrown if the types are wrong
     * @author Lucas Andersen
     */
    describe('Error throws', () => {
        it('Should throw an error if amountSold is the wrong type', () => {
            assert.throws(() => {
                const transaction = new Sale("100e2e", "Carlsberg", new Date(Date.now), "Skåde", 30, 50, new Date(Date.now));
            }, TypeError, 'Amount sold must be a number')
        })
    });
})
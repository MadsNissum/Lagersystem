import Product from "../../model/Product.js"
import assert from 'assert'

/**
 * Tests instantiation of Product object
 * @author Mikkel Hess
 */
describe('Product Constructor',()=>{
    describe('Initialize object properties', ()=>{
        const product = new Product('Carlsberg',50,new Date('2023-11-15'),'Skåde', 20, '016120')

        it('Should display brand correctly', () => {
            assert.equal(product.brand,'Carlsberg')
        })
        
        it('Should display price correctly', () => {
            assert.equal(product.price,50)
        })

        it('Should display date correctly', () => {
            assert.equal(product.expirationDate.getDate(), new Date('2023-11-15').getDate())
        })

        it('Should display location correctly', ()=>{
            assert.equal(product.location,'Skåde')
        })
        it('Should display quantity correctly', ()=>{
            assert.equal(product.quantity,20)
        })

        it('Should display id correctly',()=>{
            assert.equal(product.id,'016120')
        })
        
    })
    /**
     * Tests that the product variables are the correct types
     * @author Mikkel Hess
     */
    describe('Type checkings', () => {
        const product = new Product('Carlsberg',50.50,new Date('2023-11-15'),'Skåde',20,'016120')

        it('Brand should be of type string',()=>{
            assert.strictEqual(typeof product.brand,'string')
        })

        it('Price should be of type number',()=>{
        assert.strictEqual(typeof product.price,'number')
        })

        it('Expiration date should be a Date object',()=>{
            assert.strictEqual(product.expirationDate instanceof Date, true)
        })
        it('Location should be of type string',()=>{
            assert.strictEqual(typeof product.location,'string')
        })
        it('Quantity should be of type number',()=>{
            assert.strictEqual(typeof product.quantity,'number')
        })
        it('Id should be of type string',()=>{
            assert.strictEqual(typeof product.id, 'string')
        })

    })

    /**
     * Tests that errors gets thrown if the types are wrong
     * @author Mikkel Hess
     */
    describe('Error throws', () => {
        it('Should throw an error if brand is the wrong type', ()=>{

            assert.throws(()=>{
                const product = new Product(1000,50.50,new Date('2023-11-15'),'Skåde',20,'016120')
            },TypeError,'Brand must be a string')
        })

        it('Should throw an error if price is the wrong type', ()=>{
            assert.throws(()=>{
                const product = new Product(1000,'50',new Date('2023-11-15'),'Skåde',20,'016120')
            },TypeError,'Price must be a number')
        })

        it('Should throw an error if Expiration date is not a date object',()=>{
            assert.throws(()=>{
                const product = new Product(1000,50.50,'2023-11-15','Skåde',20,'016120')
            },TypeError,'Expiration date must be a date object')
        })

        it('Should throw an error if location is the wrong type',()=>{
            assert.throws(()=>{
                const product = new Product(1000,50.50,'2023-11-15',100,20,'016120')
            },TypeError,'Location must be a string')
        })
        it('Should throw an error if quantity is the wrong type',()=>{
            assert.throws(()=>{
                const product = new Product(1000,50.50,'2023-11-15',100,'20','016120')
            },TypeError,'Quantity must be a number')
        })

        it('Should throw an error if id is the wrong type',()=>{
            assert.throws(()=>{
                const product = new Product('Carlsberg',50.50,new Date('2023-11-15'),'Skåde',20,500)
                
            },TypeError,'Id must be a string')
        })

    })

})
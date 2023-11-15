import Product from "../model/Product.js"
import assert from 'assert'

describe('Product Constructor',()=>{
    describe('Initialize object properties', ()=>{
        const product = new Product('Carlsberg',50,new Date('2023-11-15'),'Skåde')

        it('Should display brand correctly', () => {
            assert.equal(product.brand,'Carlsberg')
        })
        
        it('Should display price correctly', () => {
            assert.equal(product.price,'50')
        })

        it('Should display date correctly', () => {
            assert.equal(product.expirationDate.getDate(), new Date('2023-11-15').getDate())
        })

        it('Should display location correctly', ()=>{
            assert.equal(product.location,'Skåde')
        })
        
    })
    describe('Type checkings', () => {
        const product = new Product('Carlsberg',50.50,new Date('2023-11-15'),'Skåde')

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

    })

    describe('Error throws', () => {
        it('Should throw an error if brand is the wrong type', ()=>{

            assert.throws(()=>{
                const product = new Product(1000,50.50,new Date('2023-11-15'),'Skåde')
            },TypeError,'Brand must be a string')
        })

        it('Should throw an error if number is the wrong type', ()=>{
            assert.throws(()=>{
                const product = new Product(1000,'50',new Date('2023-11-15'),'Skåde')
            },TypeError,'Price must be a number')
        })

        it('Should throw an error if Expiration date is not a date object',()=>{
            assert.throws(()=>{
                const product = new Product(1000,50.50,'2023-11-15','Skåde')
            },TypeError,'Expiration date must be a date object')
        })

        it('Should throw an error if brand is the wrong type',()=>{
            assert.throws(()=>{
                const product = new Product(1000,50.50,'2023-11-15',100)
            },TypeError,'Location must be a string')
        })



    })

})
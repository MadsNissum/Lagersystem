import Product from "../model/Product.js"

describe('Product Constructor',()=>{
    it('Should initialize object properties correctly', ()=>{
        const product = new Product('Carlsberg',50,Date.parse('2023-11-15'),'Skåde');
        assert.equal(product.brand,'Carlsberg')
        assert.equal(product.price,'50')
        assert.equal(Date.parse(product.expirationDate),Date.parse('2013-11-15'))
        assert.equal(product.location,'Skåde')
    })
})

describe('Product restock test',()=>{

    it('Should add a product to the product restock collection',async ()=>{

        let product = new Product('Carlsberg', 28, new Date("2013-11-16"), 'Skåde', 100)
        
        let doc = await addProductRestock(product)

        let addedProductRestock = await getProduct(doc.id)
    
        assert.deepStrictEqual(product.toPlainObject(), addedProductRestock.toPlainObject());
        
    })

})

import { Product } from "../../model/Product.js"
import { getProductRestock, addProductRestock, deleteProductRestock } from "../../database/productRestockDB.js"
import { getProduct, addProduct, deleteProduct } from "../../database/productDB.js"
import assert from 'assert'


    describe('Product restock test', () => {

        it('Should add a product to the product restock collection',async ()=>{

            let product = new Product('Test', 28, new Date("2013-11-16"), 'Skåde', 100)
        
            let doc = await addProductRestock(product.toPlainObject());

            let addedProductRestock = await getProductRestock(doc.id);

            assert.deepStrictEqual(product.brand, addedProductRestock.brand);

            deleteProduct(doc.id);
            deleteProductRestock(doc.id);
        
        })

    })

import { Product } from "../../model/Product.js";
import { doc, setDoc } from "firebase/firestore";
import assert from 'assert'
import { deleteProduct, addProduct, getProduct, updateProduct, getProducts } from "../../database/productDB.js";
import { db } from "../../database/firestore.js";
import { deleteProductRestock } from "../../database/productRestockDB.js";

    
    describe('Get Products Function', () => {

        it('Should return an array of products',async ()=>{

            let product1 = new Product('Monster Energy Monarch',20,new Date("2013-11-15"),'Skåde',20)
            let product2 = new Product('Mountain Dew',200,new Date("2011-10-14"),'Skåde',30)
            let product3 = new Product('Yoghurt',25,new Date('2016-06-20'),'Odder',10)

            let doc1 = await addProduct(product1.toPlainObject());
            let doc2 = await addProduct(product2.toPlainObject());
            let doc3 = await addProduct(product3.toPlainObject());

            let productsArray = await getProducts();
            let getProductsIsWorking = false;
            
            if(productsArray.indexOf(product1) && productsArray.indexOf('product2') && productsArray.indexOf('product3')) {
                getProductsIsWorking = true;
            }
            assert.equal(getProductsIsWorking,true);

            deleteProduct(product1);
            deleteProduct(product2);
            deleteProduct(product3);

            deleteProductRestock(doc1.id);
            deleteProductRestock(doc2.id);
            deleteProductRestock(doc3.id);

        })
        
    })


       /**
     * Tests that getProduct gets the correct product object
     * @author Mikkel Hess
     */
        describe('Get Product function', () => {
            it('Should get the correct product', async () => {
                let product = new Product('Smirnoff Ice', 12, new Date("2013-11-15"), 'Skåde', 20);
                let id = 'test';
                const docRef = doc(db, 'products', id);
    
                await setDoc(docRef, product.toPlainObject());
    
                assert.deepStrictEqual(await getProduct(id), product);
                deleteProduct(id);
            });
        });    
    
    /**
     * Tests that the product gets deleted
     * @author Mikkel Hess
     */
    describe('Delete product function', () => {
        it('Should delete the correct product', async () => {
            let product = new Product('Carlsberg', 28, new Date("2013-11-16"), 'Skåde', 100);
            let id = 'test';
            const docRef = doc(db, 'products', id);

            await setDoc(docRef, product.toPlainObject());

            await deleteProduct(id);

            assert.strictEqual(await getProduct(id), null);
        });
    });

    /**
     * Tests that the product gets added
     * @author Mikkel Hess
     */
    describe('Add Product function', () => {
        it('Should add the correct product', async () => {
            let product = new Product('Carlsberg', 28, new Date("2013-11-16"), 'Skåde', 100)

            //adding the product
            let docRef = await addProduct(product.toPlainObject());

            let addedProduct = await getProduct(docRef.id);

            assert.deepStrictEqual(product.toPlainObject(), addedProduct.toPlainObject());

            await deleteProduct(docRef.id);
        })
    })

    /**
     * Tests that ensures a product recieves an update
     * @author Amin Dahir
     */
    describe('Update product function', () => {
        it('Should update a product properly', async () => {
            let preProduct = new Product('Grimbgen', 40, new Date("2013-11-28"), 'Skåde', 20);
            let productId = "grimbergenTest";
            const docRef = doc(db, 'products', productId);
            await setDoc(docRef, preProduct.toPlainObject());

            let updatedDetails = {
                brand: "Grimbergen",
                price: 38
            };

            await updateProduct(productId, updatedDetails);

            let afterProduct = await getProduct(productId);

            assert.strictEqual(afterProduct.name, updatedDetails.name);
            assert.strictEqual(afterProduct.price, updatedDetails.price);
            await deleteProduct(productId);
        });
    });

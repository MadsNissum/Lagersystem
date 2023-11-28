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

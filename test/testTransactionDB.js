//kan ikk få den til at virke
describe('Add transaction test',()=>{
    it('Should add the transaction into the database', async ()=>{
        let product = new Product('Carlsberg', 28, new Date("2013-11-16"), 'Skåde', 100)
        
        let transDoc = await addTransaction(product,10)

        console.log(await getProduct(transDoc.id) + " faq faq faq");

        const transactionCollection = await collection(db, 'transaction');
            
        const docSnapshot = await transactionCollection.doc().get()
        
        expect(docSnapshot.exists).to.be.true;
    })


    describe('Register sale function', async () => {
        //FEJLER NOGLE GANGE???
        it('Should update the product if the quantity after the sale is above 0', async () => {
            let product = new Product('Vand', 50, new Date("2013-11-28"), 'Skåde', 20);
            let docRef1233 = await addProduct(product.toPlainObject());

            await registerSale(docRef1233.id, 10);
            let productdb = await getProduct(docRef1233.id);

            assert.equal(productdb.quantity, 10);

            await deleteProduct(docRef1233.id);
        });

        it('Should delete the product if the quantity is below 0 after the sale', async () => {

            let product_ = new Product('Syltet Gris', 30, new Date("2015-11-29"), 'Danmark', 10);
            let thaDocRef = await addProduct(product_.toPlainObject());

            await registerSale(thaDocRef.id, 30);

            assert.strictEqual(await getProduct(thaDocRef.id), null);
        });
    });

    describe('Sales endpoint test', () => {
        it('Should return an array of transactions', async () => {
            let transactions = await getTransactions();
            assert(Array.isArray(transactions), 'Transactions should be an array');
        });
    });
});



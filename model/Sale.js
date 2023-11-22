export class Sale { 
    /**
     * Initializes a new transaction
     * @param {Number} amountSold
     * @param {String} brand 
     * @param {Date} expirationDate 
     * @param {String} location
     * @param {Number} price 
     * @param {Number} quantity
     * @param {Date} transactionDate
     * @author Lucas Andersen
     */
    constructor(amountSold, brand, expirationDate, location, price, quantity, transactionDate) {
         if(typeof amountSold !== 'number') {
            throw new TypeError('Amount sold must be a number')
        }
        if(typeof brand !== 'string') {
            throw new TypeError('Brand must be a string')
        }
        if(typeof price !== 'number') {
            throw new TypeError('Price must be a number')
        }
        if(typeof location !== 'string') {
            throw new TypeError('Location must be a string')
        }
        if(typeof quantity !== 'number') {
            throw new TypeError('Quantity must be a number')
        }
        this.amountSold = amountSold;
        this.brand = brand;
        this.expirationDate = expirationDate;
        this.location = location;
        this.price = price;
        this.quantity = quantity;
        this.transactionDate = transactionDate; 
    }

    /**
     * Converts a custom object into a plain javascript object
     * @returns plain object
     * @author Lucas Andersen
     */
    toPlainObject() {
        return {
            amountSold: this.amountSold,
            brand: this.brand,
            expirationDate: this.expirationDate,
            location: this.location,
            price: this.price,
            quantity: this.quantity,
            transactionDate: this.transactionDate
        };
    }

    /**
     * Return string date
     * @returns String output of date yyyy-mm-dd
     */
    getExpirationDate() {
        return this.expirationDate.toISOString().split('T')[0];
    }
    getTransactionDate() {
        return this.transactionDate.toISOString().split('T')[0];
    }

}
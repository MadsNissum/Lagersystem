export class Product {

    #id = null;

    /**
     * Initializes a new product
     * @param {String} brand 
     * @param {Number} price 
     * @param {Date} expirationDate 
     * @param {String} location
     * @param {Number} quantity
     * @author Mikkel Hess & Mads Nissum
     */
    constructor(brand, price, expirationDate, location, quantity) {

        if(typeof brand !== 'string') {
            throw new TypeError('Brand must be a string')
        }
        if(typeof price !== 'number') {
            throw new TypeError('Price must be a number')
        }
        if(!(expirationDate instanceof Date)) {
            throw new TypeError('Expiration date must be a date object')
        }
        if(typeof location !== 'string') {
            throw new TypeError('Location must be a string')
        }
        if(typeof quantity !== 'number') {
            throw new TypeError('Quantity must be a number')
        }
        this.brand = brand;
        this.price = price;
        this.expirationDate = expirationDate;
        this.location = location;
        this.quantity = quantity;
    }

    /**
     * Function returns product id
     * @returns Auto generated id from firebase
     * @author Mads Nissum
     */
    getId() {
        return this.#id;
    }

    /**
     * Function sets product id
     * @param {String} id Auto generated id from firebase
     * @author Mads Nissum
     */
    setId(id) {
        this.#id = id;
    }
}



 
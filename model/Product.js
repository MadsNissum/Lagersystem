export default class Product {
    /**
     * Initializes a new product
     * @param {String} brand 
     * @param {Number} price 
     * @param {Date} expirationDate 
     * @param {String} location
     * @param {Number} quantity
     * @param {String} id
     * @author Mikkel Hess
     */
    constructor(brand, price, expirationDate, location, quantity, id) {

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
        if(typeof id !== 'string') {
            throw new TypeError('Id must be a string')
        }
        this.brand = brand;
        this.price = price;
        this.expirationDate = expirationDate;
        this.location = location;
        this.quantity = quantity;
        this.id = id;
    }
}



 
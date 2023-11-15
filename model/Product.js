import { log } from "console";


export default class Product {
    /**
     * Initializes a new product
     * @param {String} brand 
     * @param {Number} price 
     * @param {Date} expirationDate 
     * @param {String} location 
     */
    constructor(brand, price, expirationDate, location) {

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
        
        

        this.brand = brand;
        this.price = price;
        this.expirationDate = expirationDate;
        this.location = location;
    }
}



 
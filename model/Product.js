

export default class Product {
    /**
     * Initializes a new product
     * @param {String} brand 
     * @param {Number} price 
     * @param {Date} expirationDate 
     * @param {String} location 
     */
    constructor(brand, price, expirationDate, location) {
        this.brand = brand;
        this.price = price;
        this.expirationDate = expirationDate;
        this.location = location;
    }
}



 
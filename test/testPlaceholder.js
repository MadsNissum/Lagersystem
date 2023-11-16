import assert from 'assert'; 

// Fake data replace this when get request to product works!!!! - Lucas
let productsArray = [
    { brand: "Tuborg Classic", quantity: 10, price: 20, dueDate: new Date("2023-12-01"), location: "Skåde" },
    { brand: "Brezzer", quantity: 5, price: 15, dueDate: new Date("2023-11-30"), location: "Aarhus" },
    { brand: "Mokai", quantity: 8, price: 25, dueDate: new Date("2023-12-05"), location: "Vejle" },
    { brand: "Heineken", quantity: 15, price: 18, dueDate: new Date("2023-12-10"), location: "Horsens" },
    { brand: "Carlsberg", quantity: 12, price: 22, dueDate: new Date("2023-12-08"), location: "København" }
  ];

describe('A products is a object', function(){
    productsArray.forEach(product => {
        it('Each product should be an object', function () {
          assert.equal(typeof product, 'object');
        });
      });
});
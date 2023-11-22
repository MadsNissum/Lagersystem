/**
 * 
 * @param {?String} brand 
 * @param {?Int} price 
 * @param {?Int} quantity 
 * @param {?String} expirationDate 
 * @param {?String} location 
 * @author Lucas Andersen
 */
export async function getFilterAndSortProducts(brand, price, quantity, expirationDate, location) {
    try {
        let productsList = await getProducts();

        const filteredList = productsList.filter((product) => (
            (brand && brand != 'Alle' ? brand == product.brand : true) &&
            (price && price != 'Alle' ?  price == product.price : true) &&
            (quantity && quantity != 'Alle' ? quantity == product.quantity : true) &&
            (location && location != 'Alle' ? location == product.location : true)
        ));
        
        const sortedList = filteredList.sort((a, b) => {
            const dateA = new Date(a.expirationDate);
            const dateB = new Date(b.expirationDate);

            return expirationDate && expirationDate.toLowerCase() === 'ascending'
              ? dateA - dateB
              : dateB - dateA;
          });
          return sortedList;

    } catch (error) {
        console.error('Error fetching or processing products:', error);
    }
}
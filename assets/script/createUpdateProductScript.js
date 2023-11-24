const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

const brand = document.getElementById('brand');
const price = document.getElementById('price');
const date = document.getElementById('date');
const loc = document.getElementById('location');
const quantity = document.getElementById('quantity');

/**
 * This function handles the form request on create and update product.
 * @param {SubmitEvent} event
 * @author Mads Nissum
 */
async function handleSubmit(event) {
    event.preventDefault();

    if (brand.value.trim() == "") {
        alert("Brand is empty!");
    } else if (price.value == null || price.value <= 0) {
        alert("Price is not set or negative!");
    } else if (date.value == "" || new Date(date.value) <= Date.now()) {
        alert("Date is not set or before current date!");
    } else if (loc.value.trim() == "") {
        alert("Location is empty!");
    } else if (quantity.value == null || quantity.value <= 0) {
        alert("Quantity is not set or negative!");
    } else {

        let id = null;
        let method;
        if (form.action.split('/')[4] == "edit") {
            id = window.location.href.split('/')[5]
            method = "PUT"
        } else {
            method = "POST"
        }
        const body = {
            product: {
                brand: brand.value,
                price: price.value,
                expirationDate: date.value,
                location: loc.value,
                quantity: quantity.value
            },
            id : id
        };

        try {
            console.log(body);
            await request(form.action, body, method);
            window.location = "/inventory";
        } catch (error) {
            errorCodeAlert(error);
        }
    }
}

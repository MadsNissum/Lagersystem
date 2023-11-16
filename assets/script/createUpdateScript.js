const form = document.querySelector('form');
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

    console.log(form.action);

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
        if (form.action.split('/')[3] == "editProduct") {
            id = window.location.href.split('/')[4]
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
            await post(form.action, body);
            alert("Sucess!");
        } catch {
            alert("Something went wrong on the server!");
        }
    }
}

/**
 * 
 * @param {String} url URL Sting to post a request.
 * @param {Object} objekt Object sent as the body of post request.
 * @author Mads Nissum
 * @returns 
 */
async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(respons.status);
    if (respons.status !== 201) {
        console.log("TEST");
        throw new Error(respons.status);
    }
}

const tbody = document.getElementById("productList")

const brandPicker = document.getElementById("brandPicker");
const quantityPicker = document.getElementById("quantityPicker");
const pricePicker = document.getElementById("pricePicker");
const datePicker = document.getElementById("dateValue");
const locationPicker = document.getElementById("locationPicker");

let brandValue = brandPicker.options[brandPicker.selectedIndex].text;
let quantityValue = quantityPicker.options[quantityPicker.selectedIndex].text;
let priceValue = pricePicker.options[pricePicker.selectedIndex].text;
let dateValue = datePicker.options[datePicker.selectedIndex].text;
let locationValue = locationPicker.options[locationPicker.selectedIndex].text;

productsVariableArray("brand");
productsVariableArray("quantity");
productsVariableArray("price");
productsVariableArray("location");


/**
 * Navigates user to different page
 * @author Lucas Andersen
 */
function navigateToPage() {
    window.location = '/inventory?brand=' + brandValue + '&quantity=' + quantityValue + '&price=' + priceValue + '&expirationDate=' + dateValue + '&location=' + locationValue;
}

/**
 * Changes value of selects
 * @author Lucas Andersen
 */
brandPicker.addEventListener("change", function () {
    brandValue = this.value;
});
pricePicker.addEventListener("change", function () {
    priceValue = this.value;
});
quantityPicker.addEventListener("change", function () {
    quantityValue = this.value;
});
datePicker.addEventListener("change", function () {
    dateValue = this.value;
});
locationPicker.addEventListener("change", function () {
    locationValue = this.value;
});
/**
 * Changes url to add product
 * @author Mads Nissum
 */
function addProduct() {
    window.location = `/inventory/create`;
}

/**
 * Changing url til edit product
 * @param {String} id Auto generated id from firebase
 * @author Mads Nissum
 */
function updateProduct(id) {
    window.location = `/inventory/edit/${id}`;
}

/**
 * Calling delete request for product with id
 * @param {String} id Auto generated id from firebase
 * @author Mads Nissum
 */
async function deleteProduct(id) {
    try {
        await deleteRequest(window.location.href + "/" + id);
        window.location = '/inventory';
    } catch {
        alert("Something went wrong on the server!");
    }
}

/**
 * HTTP delete request from url
 * @param {String} url String url
 * @returns request response
 * @author Mads Nissum
 */
async function deleteRequest(url) {
    console.log(url);
    let respons = await fetch(url, { method: "DELETE" });
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
}

/**
 * Function make a post request with url and body for request
 * @param {String} url URL Sting to post a request.
 * @param {Object} objekt Object sent as the body of post request.
 * @author Mads Nissum
 */
async function request(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) {
        console.log("TEST");
        throw new Error(respons.status);
    }
    return await respons.json();
}

/**
 * @param {Product[]} products 
 * @param {String} variableType
 * @returns // returns an array of a set variable 
 * @author Lucas Andersen
 */
async function productsVariableArray(variableType) {
    let products = await request('/inventory/get');
    let variableArray = [];

    products.forEach(product => {
        if (!variableArray.includes(product[variableType])) {
            variableArray.push(product[variableType]);
            let option = document.createElement("option");
            option.textContent = product[variableType];
            option.value = product[variableType];

            switch (variableType) {
                case "brand":
                    brandPicker.appendChild(option);
                    break;
                case "quantity":
                    quantityPicker.appendChild(option);
                    break;
                case "price":
                    pricePicker.appendChild(option);
                    break;
                case "location":
                    locationPicker.appendChild(option);
                    break;
            }
        }
    });
}

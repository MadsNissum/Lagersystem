/**
 * Changing url til edit product
 * @param {String} id Auto generated id from firebase
 * @author Mads Nissum
 */
function updateProduct(id) {
    window.location = `/editProduct/${id}`
}

/**
 * Calling delete request for product with id
 * @param {String} id Auto generated id from firebase
 * @author Mads Nissum
 */
async function deleteProduct(id) {
    try {
        await deleteRequest(window.location.href + "/" + id);
        window.location = '/products';
    } catch {
        alert("Something went wrong on the server!");
    }
}

/**
 * HTTP delete request from url
 * @param {String} url String url
 * @returns request response
 */
async function deleteRequest(url) {
    console.log(url);
    let respons = await fetch(url, { method: "DELETE" });
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
}